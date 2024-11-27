import Quill from "quill";
import ImageResize from "quill-image-resize";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
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
  const [hashtags, setHashtags] = useState([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [selectedHashtags, setSelectedHashtags] = useState([]);

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

  const handleHashtagKeyDown = async (e) => {
    if (e.key === "Enter" && hashtagInput) {
      e.preventDefault();
      const newHashtagName = `#${hashtagInput.trim()}`;

      if (!hashtags.some((h) => h.hashtagName === newHashtagName)) {
        try {
          const response = await axiosConfig.post("/hashtag", {
            hashtagName: newHashtagName,
          });

          const newHashtag = response.data;
          setHashtags([...hashtags, newHashtag]);
          setSelectedHashtags([...selectedHashtags, newHashtag.hashtagId]);
          setHashtagInput("");
        } catch (error) {
          console.error("Error adding hashtag", error);
        }
      }
    }
  };

  const removeHashtag = async (hashtagId) => {
    setHashtags(hashtags.filter((h) => h.hashtagId !== hashtagId));
    setSelectedHashtags(selectedHashtags.filter((id) => id !== hashtagId));
  };

  useEffect(() => {
    if (blogId) {
      axiosConfig.get(`/blog/get/${blogId}`).then((response) => {
        const blogById = response.data.data;
        setImageBlog(blogById.imageURL);
        setBlogCategoryId(blogById.blogCategory.blogCategoryId);
        setBlogAuthorId(blogById.blogAuthor.blogAuthorId);
        setContent(blogById.content);
        setHashtags(blogById.hashtags || []); // Chứa chi tiết các hashtag
        setSelectedHashtags(
          blogById.hashtags.map((hashtag) => hashtag.hashtagId)
        );
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
    const payload = { ...data, content, hashtagIds: selectedHashtags };
    console.log("Payload:", payload);
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
                  {blogId
                    ? customTranslate("Edit Blog")
                    : customTranslate("Create Blog")}
                </h2>

                {/* Blog Title */}
                <div className="form-group col-lg-12">
                  <label>{customTranslate("Title")}</label>
                  <input
                    type="text"
                    className="form-control validate"
                    {...register("title", {
                      required: customTranslate("Title cannot be blank!"),
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
                  <label>{customTranslate("Content")}</label>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder={customTranslate("Enter blog content")}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                  />
                </div>

                {/* Blog Category */}
                <div className="form-group col-lg-6">
                  <label className="text-white">
                    {customTranslate("Blog Category")}
                  </label>
                  <select
                    className="restable-form-input"
                    {...register("blogCategoryId", {
                      required: customTranslate("Please select Blog Category"),
                    })}
                  >
                    <option value="">
                      {customTranslate("Select blog category")}
                    </option>
                    {blogCategories.map((category) => (
                      <option
                        key={category.blogCategoryId}
                        value={category.blogCategoryId}
                        selected={blogCategoryId === category.blogCategoryId}
                      >
                        {customTranslate(`${category.blogCategoryName}`)}
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
                  <label className="text-white">
                    {customTranslate("Author")}
                  </label>
                  <select
                    className="restable-form-input"
                    {...register("blogAuthorId", {
                      required: customTranslate("Please select Author"),
                    })}
                  >
                    <option value="">{customTranslate("Select Author")}</option>
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
                  <label>{customTranslate("Hashtag")}</label>
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
                      <span key={hashtag.hashtagId} className="hashtag">
                        {hashtag.hashtagName}
                        <span
                          className="hashtag-remove"
                          onClick={() => removeHashtag(hashtag.hashtagId)} // Gọi hàm xóa hashtag
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
                    {blogId
                      ? customTranslate("Update")
                      : customTranslate("Create")}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Blog Image */}
          <div className="tm-block-col tm-col-avatar">
            <div className="tm-bg-primary-dark tm-block tm-block-avatar">
              <h2 className="tm-block-title">{customTranslate("URL Image")}</h2>
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
                {blogId
                  ? customTranslate("Edit Image")
                  : customTranslate("Add Image")}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
