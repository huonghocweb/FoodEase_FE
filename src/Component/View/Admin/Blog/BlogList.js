import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Để điều hướng sang trang mới
import axiosConfig from "../../../Config/AxiosConfig";
import "./Blog.css";

const BlogList = () => {
  const [Blogs, setBlogs] = useState([]);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axiosConfig
      .get("/blog")
      .then((response) => {
        // Sắp xếp bàn mới nhất lên đầu, sắp xếp theo ID giảm dần
        const sortedBlogs = response.data.sort((a, b) => b.blogId - a.blogId);
        setBlogs(sortedBlogs);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (blogId) => {
    setSelectedBlogId(blogId); // Lưu ID bàn đang chỉnh sửa
  };

  const handleSuccess = () => {
    fetchTables();
    setSelectedBlogId(null); // Reset ID sau khi chỉnh sửa thành công
  };

  const handleDelete = (blogId) => {
    axiosConfig
      .delete(`/blog/delete/${blogId}`)
      .then(() => fetchTables())
      .catch((error) => {
        console.error("Lỗi xóa blog: ", error);
        alert("Xóa không thành công. Vui lòng thử lại.");
      });
  };

  return (
    <div className="body">
      <div id="reportsPage">
        <div id="home">
          <div className="container">
            <div className="row tm-content-row">
              <div className="col-12 tm-block-col">
                <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                  <h1 className="restable-list-title">Blog List</h1>
                  <NavLink
                    className="btn btn-primary"
                    to="/admin/blog/new"
                    style={{
                      display: "flex",
                      width: "150px",
                      float: "right",
                    }}
                  >
                    Create Blog
                  </NavLink>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th colSpan={2}>Title</th>
                        <th scope="col">Blog category</th>
                        <th scope="col">Author</th>
                        <th scope="col">Date</th>
                        <th colSpan={2}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Blogs.map((blog, index) => (
                        <tr key={blog.blogId}>
                          <td>{Blogs.length - index}</td>{" "}
                          {/* Số thứ tự ngược từ lớn đến nhỏ */}
                          <td>
                            <img
                              style={{ width: "80px" }}
                              src={blog.imageURL}
                            ></img>
                          </td>
                          <td>{blog.title}</td>
                          <td>{blog.blogCategory.blogCategoryName}</td>
                          <td>{blog.blogAuthor.blogAuthorName}</td>
                          <td>
                            {new Date(blog.createAt).toLocaleDateString('vi-VN')}{" "}
                            {new Date(blog.createAt).toLocaleTimeString('vi-VN')}
                          </td>
                          <td>
                            <NavLink
                              to={`/admin/blog/edit/${blog.blogId}`}
                              onClick={() => handleEdit(blog.blogId)}
                            >
                              <i class="fa-solid fa-gear fa-lg"></i>
                            </NavLink>
                          </td>
                          <td>
                            <NavLink>
                              <i
                                class="fa-solid fa-trash fa-lg"
                                onClick={() => handleDelete(blog.blogId)}
                              ></i>
                            </NavLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
