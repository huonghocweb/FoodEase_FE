import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
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
  const [imageBlogComment, setImageBlogComment] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifs, setGifs] = useState([]);
  const userId = localStorage.getItem("userIdLogin");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImage = async () => {
    // Khi liên kết useRef với input file , truy cập vào current.files để lấy ra files
    // Lúc này files là 1 đối tượng FileList, kh phải mảng nhưng sẽ chứa danh sách tệp chọn từ thẻ input
    // Và sử dụng như 1 mảng thông thường
    let files = fileImgBlogComment.current.files;
    // Kiểm tra nếu files không được chọn thì
    if (files.length === 0) {
      return [];
    }
    // Nếu files được chọn, chuyển files thành mảng và trả về
    return Array.from(files);
  };

  // Hàm xử lý khi người dùng chọn một ảnh mới
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  useEffect(() => {
    if (commentId) {
      // Lấy thông tin bàn từ API để chỉnh sửa
      axiosConfig.get(`/blogcomments/get/${commentId}`).then((response) => {
        const blogCommentById = response.data.data;
        setImageBlogComment(blogCommentById.imageUrl);
        console.log(response.data.data);
        reset(response.data.data);
      });
    }
    fetchBlogData();
  }, [commentId, reset]);

  const fetchBlogData = async () => {
    try {
      const response = await axiosConfig.get(`/blog/get/${blogId}`);
      setBlog(response.data.data);

      // Fetch related blogs
      const categoryId = response.data.data.blogCategory.blogCategoryId;
      const relatedResponse = await axiosConfig.get(
        `/blog/category/${categoryId}`
      );
      if (Array.isArray(relatedResponse.data)) {
        setRelatedBlogs(relatedResponse.data);
      } else {
        console.error("Dữ liệu không phải là một mảng:", relatedResponse.data);
        setRelatedBlogs([]);
      }

      // Fetch comments
      const commentsResponse = await axiosConfig.get(`/blogcomments/${blogId}`);
      setComments(commentsResponse.data);
      console.log(commentsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
    };
    formData.append(
      "blogCommentRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const files = await handleImage();
    if (files.length > 0) {
      for (const file of files) {
        formData.append("ImgBlogComment", file);
      }
    }
    if (commentId) {
      // Cập nhật bàn
      const blogCommentUpdate = await axiosConfig
        .put(`/blogcomments/blogcomments/${commentId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => fetchBlogData())
        .catch((error) => console.error(error));
    } else {
      // Tạo mới bàn
      const blogCommentCreate = await axiosConfig
        .post("/blogcomments/blogcomments", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => fetchBlogData())
        .catch((error) => console.error(error));
    }
  };

  const handleDelete = (tableId) => {
    axiosConfig
      .delete(`/restables/delete/${tableId}`)
      .then(() => fetchBlogData())
      .catch((error) => {
        console.error("Lỗi xóa bàn: ", error);
        alert("Xóa không thành công. Vui lòng thử lại.");
      });
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
          <div className="blog-detail-hashtags">
            {blog.hashtags.map((hashtag) => (
              <span key={hashtag.hashtagId} className="hashtag">
                {hashtag.hashtagName}
              </span>
            ))}
          </div>
        </>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="comment-form">
          <div className="comment-input-container">
            <input
              type="text"
              {...register("commentContent", {
                required: "",
              })}
            />
            <button type="submit" className="send-button">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
          <input
            type="file"
            ref={fileImgBlogComment}
            onChange={handleImageChange}
          />
        </form>

        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment">
              <p>
                <strong>{comment.user.userName}</strong>
              </p>
              <p>{comment.commentContent}</p>
              <p className="comment-time">
                {new Date(comment.createAt).toLocaleString("vi-VN")}
              </p>
              <button className="reply-button">Reply</button>
              {localStorage.getItem("userIdLogin") ===
                String(comment.user.userId) && (
                <button
                  className="delete-button"
                  onClick={() =>
                    handleDelete(comment.commentId, comment.user.userId)
                  }
                >
                  Delete
                </button>
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
    </div>
  );
};

export default BlogDetail;
