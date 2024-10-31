// BlogDetail.js
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosConfig from "../../../Config/AxiosConfig";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // Fetch blog details
    axiosConfig
      .get(`/blog/get/${blogId}`)
      .then((response) => {
        setBlog(response.data.data);
        const categoryId = response.data.data.blogCategory.blogCategoryId;
        // Fetch related blogs based on the category or tag
        return axiosConfig.get(`/blog/category/${categoryId}`);
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setRelatedBlogs(res.data);
        } else {
          console.error("Dữ liệu không phải là một mảng:", res.data);
          setRelatedBlogs([]);
        }
      })
      .catch((error) => console.error(error));
  }, [blogId]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Cuộn mượt mà
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
        </>
      )}

      <h3 style={{ textAlign: "center" }}>Related blogs</h3>
      <div className="related-blogs">
        {Array.isArray(relatedBlogs) && relatedBlogs.length > 0 ? (
          relatedBlogs
            .sort((a, b) => b.id - a.id) // Sắp xếp theo id mới nhất trước
            .slice(0, 3) // Chỉ lấy 3 bài viết đầu tiên
            .map((related) => (
              <Link
                to={`/blog/${related.blogId}`}
                onClick={scrollToTop}
                key={related.id}
                className="related-blog-item"
              >
                <img
                  src={related.imageURL}
                  style={{ width: "250px" }}
                  alt={related.title}
                />
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
