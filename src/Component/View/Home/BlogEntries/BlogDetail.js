import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const { commentId } = useParams();
  const fileImgBlogComment = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageEdit, setSelectedImageEdit] = useState(null);
  const [imageBlogComment, setImageBlogComment] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const userId = localStorage.getItem("userIdLogin");
  const [user, setUser] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(comments.imageURL);
  const [isEditing, setIsEditing] = useState(null); // Trạng thái chế độ chỉnh sửa cho từng comment
  const [editContent, setEditContent] = useState(""); // Nội dung chỉnh sửa
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [likeId, setLikeId] = useState(null); // ID của like/dislike nếu có

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = async () => {
    if (fileImgBlogComment.current && fileImgBlogComment.current.files) {
      const files = fileImgBlogComment.current.files;
      return files.length ? Array.from(files) : [];
    }
    return [];
  };
  // Hàm xử lý khi người dùng chọn một ảnh mới
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    } else {
      setSelectedImage(null);
    }
  };
  const handleImageChangeEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageEdit(imageUrl);
    } else {
      setSelectedImageEdit(null);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBlogData();
  }, [isEditing, reset]);

  const handleEdit = (isEditing) => {
    setIsEditing(isEditing);
    if (isEditing) {
      axiosConfig.get(`/blogcomments/get/${isEditing}`).then((response) => {
        const CommentById = response.data.data;
        setSelectedImageEdit(CommentById.imageURL);
        console.log(CommentById);
      });
    }
    setIsOpen(false);
  };

  const handleRemoveImageEdit = () => {
    setSelectedImageEdit(null);
  };
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleSaveEdit = async (comment) => {
    const formData = new FormData();
    const payload = {
      ...comment,
      blogId: blogId,
      userId: localStorage.getItem("userIdLogin"),
    };
    console.log(payload);
    if (selectedImageEdit) {
      formData.append("ImgBlogComment", fileImgBlogComment.current.files[0]);
    }

    const files = await handleImage();
    files.forEach((file) => formData.append("ImgBlogComment", file));

    try {
      await axiosConfig.put(
        `/blogcomments/blogcomments/${commentId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      fetchBlogData();
      setIsEditing(null); // Thoát chế độ chỉnh sửa
    } catch (error) {
      console.error("Error saving comment edit: ", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditContent("");
  };

  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await axiosConfig.get(`/user/${userId}`);
        setUser(response.data); // Lưu thông tin user vào state
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng: ", error);
      }
    }
  };

  const fetchBlogData = async () => {
    try {
      // Gửi tất cả yêu cầu API đồng thời
      const [
        blogResponse,
        relatedResponse,
        commentsResponse,
        blogLikeResponse,
      ] = await Promise.all([
        axiosConfig.get(`/blog/get/${blogId}`),
        axiosConfig.get(`/blog/category/${blogId}`),
        axiosConfig.get(`/blogcomments/${blogId}`),
        axiosConfig.get(`/bloglike/${blogId}`),
      ]);

      // Xử lý dữ liệu blog
      const blogData = blogResponse.data.data;
      setBlog(blogData);
      console.log(blogData);

      // Xử lý các bài viết liên quan
      const categoryId = blogData.blogCategory.blogCategoryId;
      if (Array.isArray(relatedResponse.data)) {
        setRelatedBlogs(relatedResponse.data);
      } else {
        console.error("Dữ liệu không phải là một mảng:", relatedResponse.data);
        setRelatedBlogs([]);
      }

      // Xử lý các bình luận, sắp xếp theo `commentId` giảm dần
      const sortedComments = commentsResponse.data.sort(
        (a, b) => b.commentId - a.commentId
      );
      setComments(sortedComments);
      console.log(sortedComments);

      // Xử lý dữ liệu like/dislike và tìm `likeId` của người dùng hiện tại
      const blogLike = blogLikeResponse.data;
      setLikeCount(blogLike.filter((like) => like.isLike).length);
      setDislikeCount(blogLike.filter((like) => !like.isLike).length);

      // Giả sử bạn có `userId` từ đâu đó trong mã của mình
      const userLike = blogLike.find((like) => like.userId === userId);
      if (userLike) {
        setLikeId(userLike.likeId); // Lưu `likeId` để sử dụng khi xóa like/dislike
        setLiked(userLike.isLike); // Cập nhật trạng thái liked nếu là like
        setDisliked(!userLike.isLike); // Cập nhật trạng thái disliked nếu là dislike
      }

      console.log(blogLike);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const handleLike = async () => {
    try {
      if (liked) {
        // Nếu đã like, nhấn lại để xóa like bằng likeId
        await axiosConfig.delete(`/bloglike/delete/${likeId}`);
        setLiked(false);
        setLikeCount(likeCount - 1); // Giảm số lượng like
        setLikeId(null); // Đặt lại likeId vì đã xóa
      } else {
        // Nếu trước đó là dislike, chuyển về trạng thái like
        if (disliked) {
          await axiosConfig.put(`/bloglike/likeOrDislike`, {
            blogId,
            userId,
            isLike: true,
          });
          setDisliked(false);
          setDislikeCount(dislikeCount - 1); // Giảm số lượng dislike
        } else {
          // Nếu chưa like hoặc dislike, tạo mới like
          const response = await axiosConfig.post(`/bloglike`, {
            blogId,
            userId,
            isLike: true,
          });
          setLikeId(response.data.likeId); // Lưu lại likeId sau khi tạo mới
        }
        setLiked(true);
        setLikeCount(likeCount + 1); // Tăng số lượng like
      }
    } catch (error) {
      console.error("Error updating like status", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (disliked) {
        // Nếu đã dislike, nhấn lại để xóa dislike bằng likeId
        await axiosConfig.delete(`/bloglike/delete/${likeId}`);
        setDisliked(false);
        setDislikeCount(dislikeCount - 1); // Giảm số lượng dislike
        setLikeId(null); // Đặt lại likeId vì đã xóa
      } else {
        // Nếu trước đó là like, chuyển về trạng thái dislike
        if (liked) {
          await axiosConfig.put(`/bloglike/likeOrDislike`, {
            blogId,
            userId,
            isLike: false,
          });
          setLiked(false);
          setLikeCount(likeCount - 1); // Giảm số lượng like
        } else {
          // Nếu chưa like hoặc dislike, tạo mới dislike
          const response = await axiosConfig.post(`/bloglike`, {
            blogId,
            userId,
            isLike: false,
          });
          setLikeId(response.data.likeId); // Lưu lại likeId sau khi tạo mới
        }
        setDisliked(true);
        setDislikeCount(dislikeCount + 1); // Tăng số lượng dislike
      }
    } catch (error) {
      console.error("Error updating dislike status", error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
      blogId: blogId,
      userId: localStorage.getItem("userIdLogin"),
    };
    console.log(payload);
    formData.append(
      "blogCommentRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const files = await handleImage();
    files.forEach((file) => formData.append("ImgBlogComment", file));

    const request = isEditing ? axiosConfig.put : axiosConfig.post;
    const url = isEditing
      ? `/blogcomments/blogcomments/${isEditing}`
      : "/blogcomments/blogcomments";

    request(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        fetchBlogData();
        setSelectedImage(null);
        setIsEditing(null);
        reset();
      })
      .catch(console.error);
  };

  const handleDelete = (commentId) => {
    axiosConfig
      .delete(`/blogcomments/delete/${commentId}`)
      .then(() => fetchBlogData())
      .catch((error) => {
        console.error("Lỗi xóa bàn: ", error);
        alert("Xóa không thành công. Vui lòng thử lại.");
      });
    setIsOpen(false);
  };

  const handleImageClick = (imageUrl) => {
    setImageUrl(imageUrl);
    setShowImageModal(true); // Hiển thị modal khi nhấn vào hình ảnh
  };

  return (
    <div className="blog-detail-container">
      {blog && (
        <>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-publish">
            <div className="author-info">
              <span className="fa-solid fa-xl fa-user"></span>
              <h5>{blog.blogAuthor.blogAuthorName}</h5>
            </div>
            <div className="blog-detail-date">
              <h5>
                {new Date(blog.createAt).toLocaleDateString("vi-VN")}{" "}
                {new Date(blog.createAt).toLocaleTimeString("vi-VN")}
              </h5>
            </div>
          </div>
          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="blog-footer">
            <div className="blog-detail-hashtags">
              {blog.hashtags.map((hashtag) => (
                <span key={hashtag.hashtagId} className="hashtag">
                  {hashtag.hashtagName}
                </span>
              ))}
            </div>
            <div className="blog-like">
              <button onClick={handleLike} className={`like-button ${liked ? "active" : ""}`} >
                <i className="fa-solid fa-thumbs-up"></i> {liked} ({likeCount})
              </button>
              <button onClick={handleDislike} className={`dislike-button ${disliked ? "active" : ""}`} >
                <i className="fa-solid fa-thumbs-down"></i> {disliked}(
                {dislikeCount})
              </button>
            </div>
          </div>
        </>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="comment-blog-form">
          <div className="comment-input-container">
            {user && user.imageUrl && (
              <img src={user.imageUrl} className="user-imgUrl" />
            )}
            <input
              type="text"
              {...register("commentContent", {
                required: "Content cannot be blank !",
              })}
            />
            <input
              id="fileImgComment"
              type="file"
              multiple
              ref={fileImgBlogComment}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label
              htmlFor="fileImgComment"
              className="fa-solid fa-paperclip"
              style={{
                cursor: "pointer",
                marginLeft: "15px",
                marginTop: "10px",
              }}
            ></label>
            <button type="submit" className="send-button">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <div className="comment-img-container">
            <img
              src={selectedImage || imageBlogComment}
              className={`imgComment ${!selectedImage ? "hidden" : ""}`}
            />
            <button
              id="delete-img"
              style={{ display: "none" }}
              onClick={handleRemoveImage}
            >
              Xóa ảnh
            </button>
            <label
              htmlFor="delete-img"
              className={`fa fa-times fa-2x ${!selectedImage ? "hidden" : ""}`}
              style={{ cursor: "pointer", marginTop: "-10px" }}
            ></label>
          </div>
        </form>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <div className="comment-in4">
                <img className="user-imgUrl" src={comment.user.imageUrl}></img>
                <p className="comment-userName">
                  <strong>{comment.user.fullName}</strong>
                </p>
                <p className="comment-time">
                  {new Date(comment.createAt).toLocaleString("vi-VN")}
                </p>
              </div>
              {isEditing === comment.commentId ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="edit-comment-form"
                >
                  <div>
                    <input
                      type="text"
                      {...register("commentContent", {
                        required: "Content cannot be blank !",
                      })}
                    />
                    <input
                      id="fileImgCommentEdit"
                      type="file"
                      ref={fileImgBlogComment}
                      onChange={handleImageChangeEdit}
                      style={{ display: "none" }}
                    />
                    <label
                      htmlFor="fileImgCommentEdit"
                      className="fa-solid fa-paperclip"
                      style={{ cursor: "pointer" }}
                    ></label>
                    <button type="submit" className="send-button">
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                    {selectedImageEdit && (
                      <div className="selected-image-container">
                        <img
                          src={selectedImageEdit}
                          className="imgCommentEdit"
                          onClick={() => handleImageClick(selectedImageEdit)}
                        />
                        <button
                          id="delete-img"
                          style={{ display: "none" }}
                          onClick={handleRemoveImageEdit}
                        >
                          Xóa ảnh
                        </button>
                        <label
                          htmlFor="delete-img"
                          className="fa fa-times fa-2x"
                          style={{ cursor: "pointer", marginTop: "-10px" }}
                        ></label>
                      </div>
                    )}
                    <div>
                      <button onClick={handleCancelEdit}>Hủy</button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="list-comment">
                  <div className="comment-actions">
                    <h5>{comment.commentContent}</h5>
                    {localStorage.getItem("userIdLogin") ===
                      String(comment.user.userId) && (
                      <>
                        <i
                          className="fa-solid fa-ellipsis-vertical"
                          onClick={() => setIsOpen(!isOpen)}
                          style={{ cursor: "pointer", marginLeft: "20px" }}
                        ></i>
                        {isOpen && (
                          <ul className="comment-edit-dropdown">
                            <li
                              className="edit-button"
                              onClick={() => handleEdit(comment.commentId)}
                              style={{ cursor: "pointer" }}
                            >
                              {customTranslate("Edit")}
                            </li>
                            <li
                              className="delete-button"
                              onClick={() => handleDelete(comment.commentId)}
                              style={{ cursor: "pointer" }}
                            >
                              {customTranslate("Delete")}
                            </li>
                          </ul>
                        )}
                      </>
                    )}
                  </div>
                  <img
                    className={`imgUrl-Comment ${
                      !comment.imageURL ? "hidden" : ""
                    }`}
                    src={comment.imageURL}
                    onClick={() => handleImageClick(comment.imageURL)}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <h3 style={{ textAlign: "center" }}>Related blogs</h3>
      <div className="related-blogs">
        {Array.isArray(relatedBlogs) && relatedBlogs.length > 0 ? (
          relatedBlogs
            .filter((related) => related.blogId !== blog.blogId)
            .sort((a, b) => b.id - a.id)
            .slice(0, 3)
            .map((related) => (
              <Link
                to={`/blog/${related.blogId}`}
                key={related.id}
                className="related-blog-item"
              >
                <img src={related.imageURL} alt={related.title} />
                <div className="related-blog-title">
                  <h4>{related.title}</h4>
                </div>
              </Link>
            ))
        ) : (
          <p>No related blogs.</p>
        )}
      </div>

      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="image-modal-content">
            <img src={imageUrl} className="image-modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
