import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import "./CreateUser.css";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    address: "",
    birthday: "",
    gender: true,
    roleIds: [2], // Mặc định là vai trò "User"
  });
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const token = location.state?.token || ""; // Nhận mã xác thực từ trạng thái điều hướng

  // Xử lý thay đổi dữ liệu đầu vào
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý tải lên ảnh đại diện
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  // Xử lý gửi dữ liệu để tạo tài khoản
  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Kiểm tra xem các trường có hợp lệ không (bao gồm cả token)
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("userName", formData.userName);
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append("phoneNumber", formData.phoneNumber);
    formDataToSubmit.append("password", formData.password);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("birthday", formData.birthday);
    formDataToSubmit.append("gender", formData.gender);
    formDataToSubmit.append("roleIds", JSON.stringify(formData.roleIds)); // JSON chuỗi
    formDataToSubmit.append("email", email); // Lấy email đã xác thực
    formDataToSubmit.append("token", token); // Token từ xác thực
    if (avatar) {
      formDataToSubmit.append("image", avatar);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data); // Log nội dung trả về từ backend
        console.error("Error status:", error.response.status); // Log mã trạng thái
        console.error("Error headers:", error.response.headers); // Log header trả về
        alert(
          "Failed to create account: " + error.response.data.message ||
            "Unknown error."
        );
      } else {
        console.error("Error:", error.message);
        alert("Failed to create account: An unknown error occurred.");
      }
    }
  };

  return (
    <div className="create-user-wrapper">
      <h2 className="create-user-header">
        {customTranslate("Create Account")}
      </h2>
      <form className="create-user-form" onSubmit={handleCreateAccount}>
        {/* Avatar Upload */}
        <div className="create-user-avatar-container">
          <img
            src={avatar}
            alt=""
            className="user-form-avatar"
            onClick={() => document.getElementById("avatarUpload").click()}
          />
          <input
            type="file"
            accept="image/*"
            id="avatarUpload"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </div>

        {/* Account Name */}
        <div className="create-user-form-group">
          <label htmlFor="userName">{customTranslate("Account Name")}</label>
          <input
            id="userName"
            name="userName"
            type="text"
            value={formData.userName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Full Name */}
        <div className="create-user-form-group">
          <label htmlFor="fullName">{customTranslate("Full Name")}</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone Number */}
        <div className="create-user-form-group">
          <label htmlFor="phoneNumber">{customTranslate("Phone Number")}</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div className="create-user-form-group">
          <label htmlFor="password">{customTranslate("Password")}</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="create-user-form-group">
          <label htmlFor="confirmPassword">
            {customTranslate("Re-enter Password")}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Address */}
        <div className="create-user-form-group">
          <label htmlFor="address">{customTranslate("Address")}</label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Birthday */}
        <div className="create-user-form-group">
          <label htmlFor="birthday">{customTranslate("Birthday")}</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="create-user-form-group">
          <label htmlFor="genderSelect">{customTranslate("Gender")}</label>
          <select
            id="genderSelect"
            name="gender"
            value={formData.gender ? "true" : "false"}
            onChange={handleInputChange}
          >
            <option value="true">{customTranslate("Male")}</option>
            <option value="false">{customTranslate("Female")}</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="create-user-button">
          {customTranslate("Create Account")}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
