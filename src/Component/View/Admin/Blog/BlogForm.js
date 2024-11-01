import Quill from "quill";
import ImageResize from "quill-image-resize";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Blog.css";
Quill.register("modules/imageResize", ImageResize);

const BlogForm = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogCategoryId, setBlogCategoryId] = useState();
  const [blogAuthor, setBlogAuthor] = useState([]);
  const [blogAuthorId, setBlogAuthorId] = useState();
  const fileImgBlog = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBlog, setImageBlog] = useState([]);
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]); // Thêm trạng thái cho danh sách hashtag
  const [hashtagInput, setHashtagInput] = useState(""); // Trạng thái cho input hashtag

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Cấu hình module và định dạng của ReactQuill
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    imageResize: {
      displaySize: true,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const handleImage = async () => {
    const files = fileImgBlog.current.files;
    return files.length ? Array.from(files) : [];
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleHashtagKeyDown = (e) => {
    if (e.key === "Enter" && hashtagInput) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của Enter
      const newHashtag = `#${hashtagInput.trim()}`; // Thêm dấu #
      if (!hashtags.includes(newHashtag)) {
        // Kiểm tra không trùng lặp
        setHashtags([...hashtags, newHashtag]);
        setHashtagInput(""); // Xóa input sau khi thêm
      }
    }
  };

  const removeHashtag = (hashtag) => {
    setHashtags(hashtags.filter((h) => h !== hashtag)); // Xóa hashtag
  };

  useEffect(() => {
    if (blogId) {
      axiosConfig.get(`/blog/get/${blogId}`).then((response) => {
        const blogById = response.data.data;
        setImageBlog(blogById.imageURL);
        setBlogCategoryId(blogById.blogCategory.blogCategoryId);
        setBlogAuthorId(blogById.blogAuthor.blogAuthorId);
        setContent(blogById.content);
        setHashtags(blogById.hashtags || []);
        reset(blogById);
      });
    }
    axiosConfig
      .get("/blogcategories")
      .then((response) => setBlogCategories(response.data));
    axiosConfig
      .get("/blogauthor")
      .then((response) => setBlogAuthor(response.data));
  }, [blogId, reset]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const payload = { ...data, content, hashtags };
    formData.append(
      "blogRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );

    const files = await handleImage();
    files.forEach((file) => formData.append("ImgBlog", file));

    const request = blogId ? axiosConfig.put : axiosConfig.post;
    const url = blogId ? `/blog/blog/${blogId}` : "/blog/blog";

    request(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => navigate("/admin/BlogList"))
      .catch(console.error);
  };

  return (
    <div className="body">
      <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="tm-block-col tm-col-account-settings">
            <div className="tm-bg-primary-dark tm-block tm-block-settings">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="tm-signup-form row"
              >
                <h2 className="tm-block-title">
                  {blogId ? "Edit Blog" : "Create Blog"}
                </h2>

                {/* Blog Title */}
                <div className="form-group col-lg-12">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control validate"
                    {...register("title", {
                      required: "Title cannot be blank!",
                    })}
                  />
                  {errors.title && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Blog Content */}
                <div className="form-group col-lg-12">
                  <label>Content</label>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="Enter blog content..."
                    modules={modules}
                    formats={formats}
                    theme="snow"
                  />
                </div>

                {/* Blog Category */}
                <div className="form-group col-lg-6">
                  <label className="text-white">Blog Category</label>
                  <select
                    className="restable-form-input"
                    {...register("blogCategoryId", {
                      required: "Please select Blog Category",
                    })}
                  >
                    <option value="">Select blog category</option>
                    {blogCategories.map((category) => (
                      <option
                        key={category.blogCategoryId}
                        value={category.blogCategoryId}
                        selected={blogCategoryId === category.blogCategoryId}
                      >
                        {category.blogCategoryName}
                      </option>
                    ))}
                  </select>
                  {errors.blogCategoryId && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors.blogCategoryId.message}
                    </p>
                  )}
                </div>

                {/* Blog Author */}
                <div className="form-group col-lg-6">
                  <label className="text-white">Author</label>
                  <select
                    className="restable-form-input"
                    {...register("blogAuthorId", {
                      required: "Please select Author",
                    })}
                  >
                    <option value="">Select Author</option>
                    {blogAuthor.map((author) => (
                      <option
                        key={author.blogAuthorId}
                        value={author.blogAuthorId}
                        selected={blogAuthorId === author.blogAuthorId}
                      >
                        {author.blogAuthorName}
                      </option>
                    ))}
                  </select>
                  {errors.blogAuthorId && (
                    <p style={{ color: "red", fontSize: "16px" }}>
                      {errors.blogAuthorId.message}
                    </p>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label>HashTag</label>
                  <input
                    type="text"
                    className="form-control validate"
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyDown={handleHashtagKeyDown}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <div className="hashtag-list">
                    {hashtags.map((hashtag, index) => (
                      <span key={index} className="hashtag">
                        {hashtag}
                        <span
                          className="hashtag-remove"
                          onClick={() => removeHashtag(hashtag)} // Gọi hàm xóa hashtag
                        >
                          &times;
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="form-group col-lg-12">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    {blogId ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Blog Image */}
          <div className="tm-block-col tm-col-avatar">
            <div className="tm-bg-primary-dark tm-block tm-block-avatar">
              <h2 className="tm-block-title">URL Image</h2>
              <div className="tm-avatar-container">
                <img
                  src={selectedImage || imageBlog}
                  alt="Avatar"
                  className="tm-avatar img-fluid mb-4"
                />
              </div>
              <input
                id="fileImgBlog"
                type="file"
                ref={fileImgBlog}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <label
                htmlFor="fileImgBlog"
                className="btn btn-primary btn-block text-uppercase"
              >
                {blogId ? "Edit Image" : "Add Image"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;