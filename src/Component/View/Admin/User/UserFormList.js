import React, { useState } from "react";
import { customTranslate } from "../../../../i18n";

import { useNavigate } from "react-router-dom";
import axiosConfig from "../../../Config/AxiosConfig";
import "./UserFormList.css"; // Đảm bảo rằng bạn đã import CSS mới

const UserFormList = () => {
  const [avatar, setAvatar] = useState("img/avatar.png");
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
    address: "",
    birthday: "",
    gender: true, // Mặc định là true (Nam)
    imageUrl: "", // Avatar URL
    roleIds: [], // Mảng chứa ID của vai trò được chọn
  });
  const navigate = useNavigate();

  // Xử lý upload avatar
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Gọi API để upload ảnh lên server
      const response = await axiosConfig.post("/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        const imageUrl = response.data.imageUrl;
        setAvatar(imageUrl); // Cập nhật avatar để hiển thị hình ảnh mới
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: imageUrl, // Cập nhật URL của hình ảnh vào formData
        }));
      } else {
        alert("Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Error uploading avatar");
    }
  };

  // Xử lý thay đổi form input
  const handleChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "select-multiple") {
      const selectedOptions = Array.from(event.target.selectedOptions).map(
        (option) => option.value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Xử lý thay đổi giới tính
  const handleGenderChange = (event) => {
    const value = event.target.value === "true";
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password2) {
      alert("Passwords do not match!");
      return;
    }

    const userRequest = {
      userName: formData.userName,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      birthday: formData.birthday,
      gender: formData.gender,
      imageUrl: formData.imageUrl,
      roleIds: formData.roleIds,
    };

    try {
      const response = await axiosConfig.post(
        "http://localhost:8080/api/user",
        userRequest
      );
      alert("User added successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error("There was an error creating the user!", error);
      alert("Failed to add user");
    }
  };

  const roles = [
    { id: "1", label: "STAFF" },
    { id: "2", label: "USER" },
    { id: "3", label: "ADMIN" },
  ];
  const handleRoleChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => {
      const updatedRoles = checked
        ? [...prevData.roleIds, value]
        : prevData.roleIds.filter((roleId) => roleId !== value);
      return { ...prevData, roleIds: updatedRoles };
    });
  };
  return (
    <div className="user-form-container">
      <h2 className="user-form-title">{customTranslate("Create User")}</h2>

      {/* Avatar Upload Section */}
      <div
        className="user-form-avatar-container"
        onClick={() => document.getElementById("avatarUpload").click()}
      >
        <img
          src={avatar}
          alt=""
          className="user-form-avatar"
          style={{ cursor: "pointer" }}
        />
        <input
          type="file"
          accept="image/*"
          id="avatarUpload"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Account Settings Form */}
      <form className="user-form-signup-form row" onSubmit={handleSubmit}>
        {/* Các trường nhập liệu */}
        <div className="form-group col-lg-6">
          <label htmlFor="userName">{customTranslate("Account Name")}</label>
          <input
            id="userName"
            name="userName"
            type="text"
            className="form-control"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="fullName">{customTranslate("Full Name")}</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="phoneNumber">{customTranslate("Phone")}</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="email">{customTranslate("Account Email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="password">{customTranslate("Password")}</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="password2">
            {customTranslate("Re-enter Password")}
          </label>
          <input
            id="password2"
            name="password2"
            type="password"
            className="form-control"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="address">{customTranslate("Address")}</label>
          <input
            id="address"
            name="address"
            type="text"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group col-lg-6">
          <label htmlFor="birthday">{customTranslate("Birthday")}</label>
          <input
            id="birthday"
            name="birthday"
            type="date"
            className="form-control"
            value={formData.birthday}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender Select */}
        <div className="form-group col-lg-6">
          <label htmlFor="genderSelect">{customTranslate("Gender")}</label>
          <select
            id="genderSelect"
            name="gender"
            className="form-control"
            value={formData.gender ? "true" : "false"}
            onChange={handleGenderChange}
          >
            <option value="true">{customTranslate("Male")}</option>
            <option value="false">{customTranslate("Female")}</option>
          </select>
        </div>

        {/* Multiple Role Select */}
        <div className="form-group col-lg-6">
          <label htmlFor="roleIds">{customTranslate("Role")}</label>
          <div className="role-checkboxes">
            {roles.map((role) => (
              <div key={role.id}>
                <input
                  type="checkbox"
                  id={`role_${role.id}`}
                  value={role.id}
                  checked={formData.roleIds.includes(role.id)}
                  onChange={handleRoleChange}
                />
                <label
                  htmlFor={`role_${role.id}`}
                  style={{ marginLeft: "5px" }}
                >
                  {customTranslate(`${role.label}`)}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="col-12">
          <button type="submit" className="btn btn-success">
            {customTranslate("Add")}
          </button>
        </div>
        <div className="col-12">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/users")}
          >
            {customTranslate("Back")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFormList;
