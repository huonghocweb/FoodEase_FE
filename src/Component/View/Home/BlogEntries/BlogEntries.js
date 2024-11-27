// BlogEntries.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./BlogEntries.css"; // Import CSS

const BlogEntries = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axiosConfig
      .get("/blog")
      .then((response) => {
        const sortedBlogs = response.data.sort((a, b) => b.blogId - a.blogId); // Sắp xếp blog mới nhất trước
        setBlogs(sortedBlogs);
        console.log(sortedBlogs);
      })
      .catch((error) => console.error(error));
  }, []);

  // Hàm để lấy chỉ văn bản từ nội dung HTML
  const getTextContent = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html; // Chuyển đổi HTML thành nội dung văn bản
    return tempDiv.innerText; // Trả về văn bản
  };

  // Hàm giới hạn số lượng ký tự
  const limitText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "..."; // Thêm dấu ba chấm nếu vượt quá giới hạn
    }
    return text;
  };

  return (
    <section className="blog-section">
      <div className="blog-container">
        <h2 className="section-title">{customTranslate("Blog Us")}</h2>
        {blogs.map((blog, index) => {
          const textContent = getTextContent(blog.content);
          const limitedContent = limitText(textContent, 300); // Giới hạn ở 200 ký tự

          return (
            <Link
              to={`/blog/${blog.blogId}`}
              key={blog.blogId}
              className={`blog-item ${
                index === 0 ? "blog-banner" : index % 2 === 0 ? "right" : "left"
              }`}
            >
              {index !== 0 ? (
                <>
                  <div className="blog-image">
                    <img src={blog.imageURL} alt={blog.title} />
                  </div>
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p>{limitedContent}</p> {/* Hiển thị văn bản đã giới hạn */}
                  </div>
                </>
              ) : (
                <div
                  className="blog-banner"
                  style={{ backgroundImage: `url(${blog.imageURL})` }}
                >
                  <div className={`blog-banner-content`}>
                    <h1>{blog.title}</h1>
                    <p>{limitedContent}</p> {/* Hiển thị văn bản đã giới hạn */}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BlogEntries;
