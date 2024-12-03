import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import BookTablePage from "../BookingTable/BookTablePage";
import Drink from "./Drink";
import FoodMenu from "./FoodMenu";
import Propose from "./Propose";
import Search from "./Search";
const FoodIndex = () => {
  const { t } = useTranslation(); // Khai báo useTranslation
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axiosConfig
      .get("/blog")
      .then((response) => {
        const sortedBlogs = response.data.sort((a, b) => b.blogId - a.blogId); // Sắp xếp blog mới nhất trước
        setBlogs(sortedBlogs);
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
    <section className="bg-white ">
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <h4>{customTranslate("Here you can find delecious foods")}</h4>
              <h2>{customTranslate("Asian Restaurant")}</h2>
              {/* <p>
                  Quisque nec nibh id lacus fringilla eleifend sed sit amet sem.
                  Donec lectus odio, mollis a nisl non, tempor interdum nisl.
                </p> */}
              <div className="primary-button">
                <a href="#" className="scroll-link" data-id="book-table">
                  {customTranslate("Order Right Now")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cook-delecious">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-md-offset-1">
              <div className="first-image">
                <img src="assets/images/index1.jpg" alt="" />
              </div>
            </div>
            <div className="col-md-4">
              <div className="cook-content">
                <h4>{customTranslate("We cook delecious")}</h4>
                <div className="contact-content">
                  <span>{customTranslate("You can call us on")}:</span>
                  <h6>+ 1234 567 8910</h6>
                </div>
                <span>or</span>
                <div className="primary-white-button">
                  <a href="#" className="scroll-link" data-id="book-table">
                    {customTranslate("Order Now")}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="second-image">
                <img src="assets/images/index2.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <img src="" />

      <section className="services">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="service-item">
                <a href="menu.html">
                  <img src="assets/images/cook_breakfast.png" alt="Breakfast" />
                  <h4>{customTranslate("Breakfast")}</h4>
                </a>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="service-item">
                <a href="menu.html">
                  <img src="assets/images/cook_lunch.png" alt="Lunch" />
                  <h4>{customTranslate("Lunch")}</h4>
                </a>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="service-item">
                <a href="menu.html">
                  <img src="assets/images/cook_dinner.png" alt="Dinner" />
                  <h4>{customTranslate("Dinner")}</h4>
                </a>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="service-item">
                <a href="menu.html">
                  <img src="assets/images/cook_dessert.png" alt="Desserts" />
                  <h4>{customTranslate("Desserts")}</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Search />
        <h2>{customTranslate("Main dishes")}</h2>

        <hr></hr>
        <FoodMenu />
      </section>

      <br />
      <hr />
      <section>
        <h2>{customTranslate("Drinks")}</h2>
        <hr></hr>
        <Drink />
      </section>
      <section>
        <h2>{customTranslate("Propose")}</h2>
        <hr></hr>
        <Propose />
      </section>

      <BookTablePage />

      <section className="featured-food">
        <div className="container">
          <div className="row">
            <div className="heading">
              <h2>{customTranslate("Weekly Featured Food")}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="food-item">
                <h2>{customTranslate("Breakfast")}</h2>
                <img src="assets/images/breakfast_item.jpg" alt="" />
                <div className="price">$4.50</div>
                <div className="text-content">
                  <h4>Kale Chips Art Party</h4>
                  <p>
                    Dreamcatcher squid ennui cliche chicharros nes echo small
                    batch jean shorts hexagon street art knausgaard wolf...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="food-item">
                <h2>{customTranslate("Lunch")}</h2>
                <img src="assets/images/lunch_item.jpg" alt="" />
                <div className="price">$7.50</div>
                <div className="text-content">
                  <h4>Taiyaki Gastro Tousled</h4>
                  <p>
                    Dreamcatcher squid ennui cliche chicharros nes echo small
                    batch jean shorts hexagon street art knausgaard wolf...
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="food-item">
                <h2>{customTranslate("Dinner")}</h2>
                <img src="assets/images/dinner_item.jpg" alt="" />
                <div className="price">$12.50</div>
                <div className="text-content">
                  <h4>Batch Squid Jean Shorts</h4>
                  <p>
                    Dreamcatcher squid ennui cliche chicharros nes echo small
                    batch jean shorts hexagon street art knausgaard wolf...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-blog">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading">
                <h2>{customTranslate("Our blog post")}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {blogs
              .sort((a, b) => new Date(b.createAt) - new Date(a.createAt)) // Sắp xếp theo ngày mới nhất
              .slice(0, 4) // Lấy 4 bài viết đầu tiên
              .map((blog, index) => {
                const textContent = getTextContent(blog.content);
                const limitedContent = limitText(textContent, 100); // Giới hạn ở 200 ký tự

                return (
                  <div className="col-md-6" key={blog.blogId}>
                    <Link to={`/blog/${blog.blogId}`}>
                      <div className="blog-post">
                        <img
                          style={{
                            width: "50%",
                            overflow: "hidden",
                            height: "232px",
                            borderRadius: "10px",
                            objectFit: "cover",
                            margin: "0 auto",
                          }}
                          src={blog.imageURL}
                          alt=""
                        />
                        <div className="date">
                          {new Date(blog.createAt).toLocaleDateString("vi-VN")}
                        </div>
                        <div className="right-content">
                          <h4>{blog.title}</h4>
                          <span>
                            {blog.blogCategory.blogCategoryName}/
                            {blog.blogAuthor.blogAuthorName}
                          </span>
                          <p>{limitedContent}</p>
                          <div className="text-button">
                            <a to={`/blog/${blog.blogId}`} key={blog.blogId}>
                              {customTranslate("Continue Reading")}
                            </a>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </section>
  );
};
export default FoodIndex;
