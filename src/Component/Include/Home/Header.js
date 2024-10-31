import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import i18n, { customTranslate } from "../../../i18n";
import axiosConfig from "../../Config/AxiosConfig";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState([]);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Đóng dropdown sau khi chọn ngôn ngữ
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userName = localStorage.getItem("userNameLogin");
    try {
      const resUser = await axiosConfig.get(`/user/getByUserName/${userName}`);
      setUser(resUser.data.data);
    } catch (error) {
      console.error("error in fetch Data", error);
    }
  };

  return (
    <header className="header">
      <h1 className="logo">Victory</h1>
      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">{customTranslate("Home")}</NavLink>
          </li>
          <li>
            <NavLink to="/menu">{customTranslate("Our Menus")}</NavLink>
          </li>
          <li>
            <NavLink to="/myOrder">My Order</NavLink>
          </li>
          <li>
            <NavLink to="/blog">{customTranslate("Blog Us")}</NavLink>
          </li>

          <li className="dropdown">
            <NavLink to="#">{customTranslate("My Account")}</NavLink>
            <ul className="dropdown-content">
              <li>
                <NavLink to="/couponStorage">
                  <i className="fa-solid fa-ticket-simple"></i>{" "}
                  {customTranslate("Coupon Storage")}
                </NavLink>
              </li>
              <li>
                <NavLink to="/WishList">
                  <i className="fa-solid fa-heart"></i>{" "}
                  {customTranslate("Wish List")}
                </NavLink>
              </li>
              <li>
                <NavLink to={`/orderHistory/order/${user.userName}`}>
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  {customTranslate("Order History")}
                </NavLink>
              </li>
            </ul>
          </li>

          <li>
            <Link to="/bookTable">{customTranslate("Table Reservation")}</Link>
          </li>
          <li>
            <NavLink to={`/cart/${user.userId}`}>
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/admin`}>
              <i className="fa-solid fa-user-gear fa-xl"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/chat`}>
              <i className="fa-solid fa-comments fa-lg"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/login`}>
              <i className="fa-solid fa-right-to-bracket fa-xl"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/notification`}>
              <i className="fa-solid fa-bell fa-lg"></i>
            </NavLink>
          </li>
          {user && <div>{user?.userName}</div>}
          <li>
            <i
              className="fa-xl fas fa-globe"
              onClick={() => setIsOpen(!isOpen)}
              style={{ cursor: "pointer" }}
            ></i>
            {isOpen && (
              <ul className="language-dropdown">
                <li onClick={() => changeLanguage("en")} style={{ cursor: "pointer" }}>
                  {customTranslate("English")}
                </li>
                <li onClick={() => changeLanguage("vi")} style={{ cursor: "pointer" }}>
                  {customTranslate("Vietnamese")}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
