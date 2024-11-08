import React, { useEffect, useState } from 'react';
import './Header.css';
import { useTranslation } from "react-i18next"; 
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axiosConfig from '../../Config/AxiosConfig';
import i18n, { customTranslate } from "../../../i18n";
import UserInfoPanel from '../Home/UserInfoPanel';
const Header = () => {
  const [user, setUser] = useState(null); // Khởi tạo user là null khi chưa đăng nhập
  const { t } = useTranslation(); 
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng dropdown ngôn ngữ
  const [showUserInfo, setShowUserInfo] = useState(false);
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false); // Đóng dropdown sau khi chọn ngôn ngữ
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    const userName = localStorage.getItem('userNameLogin');
    if (userName) { // Kiểm tra nếu có tên người dùng trong localStorage
      try {
        const resUser = await axiosConfig.get(`/user/getByUserName/${userName}`);
        setUser(resUser.data.data); // Cập nhật thông tin người dùng vào state
      } catch (error) {
        console.error('error in fetch Data', error);
      }
    }
  };

  const handleLogout = () => {
    // Xóa thông tin đăng nhập khi đăng xuất
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userIdLogin');
    localStorage.removeItem('userNameLogin');
    localStorage.removeItem('rolesLogin');
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userIdLogin');
    sessionStorage.removeItem('userNameLogin');
    sessionStorage.removeItem('rolesLogin');
     
    setUser(null); // Cập nhật user thành null khi đăng xuất
    navigate('/login'); // Điều hướng đến trang đăng nhập
  };
  const toggleUserInfo = () => {
    setShowUserInfo(!showUserInfo);
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
          <li><NavLink to="/myOrder">My Order</NavLink></li>
          <li>
            <NavLink to="/blog">{customTranslate("Blog Entries")}</NavLink>
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
                {user && (
                  <NavLink to={`/orderHistory/order/${user.userName}`}>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    {customTranslate("Order History")}
                  </NavLink>
                )}
              </li>
            </ul>
          </li>
          <li>
            <Link to="/bookTable">{customTranslate("Table Reservation")}</Link>
          </li>
          <li>
            {user ? (
              <NavLink to={`/cart/${user.userId}`}>
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
              </NavLink>
            ) : (
              <NavLink to="/cart">
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
              </NavLink>
            )}
          </li>
          <li><NavLink to={`/admin`}><i className="fa-solid fa-user-gear fa-xl"></i></NavLink></li>
          <li><NavLink to={`/chat`}><i className="fa-solid fa-comments fa-lg"></i></NavLink></li>
          <li><NavLink to={`/notification`}><i className="fa-solid fa-bell fa-lg"></i></NavLink></li>
          <li>
            <i className="fa-xl fas fa-globe" onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer" }}></i> 
            {isOpen && (
              <ul>
                <li onClick={() => changeLanguage("en")} style={{ cursor: "pointer" }}>
                  {customTranslate("English")}
                </li>
                <li onClick={() => changeLanguage("vi")} style={{ cursor: "pointer" }}>
                  {customTranslate("Vietnamese")}
                </li>
              </ul>
            )}
          </li>
          {/* Hiển thị tên người dùng nếu đã đăng nhập */}
          {user && (
            <div className="user-name-display" onClick={toggleUserInfo} style={{ cursor: 'pointer' }}>
              {user.userName}
            </div>
          )}
          {/* Nút đăng nhập/đăng xuất */}
          <li onClick={user ? handleLogout : () => navigate('/login')}>
            <NavLink to={user ? "#" : "/login"}>
              <i className="fa-solid fa-right-to-bracket fa-xl"></i>
            </NavLink>
          </li>

          {/* Hiển thị ngôn ngữ */}
          
        </ul>
      </nav>
      {/* Thêm UserInfoPanel */}
      <UserInfoPanel user={user} isOpen={showUserInfo} onClose={toggleUserInfo} />
    </header>
  );
};

export default Header;
