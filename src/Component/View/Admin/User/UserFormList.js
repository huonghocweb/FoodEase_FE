import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserFormList.css';
import axiosConfig from '../../../Config/AxiosConfig';

const UserFormList = () => {
    const [avatar, setAvatar] = useState("img/avatar.png");
    const [formData, setFormData] = useState({
        userName: '',
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        password2: '',
        address: '',
        birthday: '',
        gender: true, // Mặc định là true (Nam)
        imageUrl: '',  // Avatar URL
        roleIds: []  // Mảng chứa ID của vai trò được chọn
    });
    const navigate = useNavigate();

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === "select-multiple") {
            const selectedOptions = Array.from(event.target.selectedOptions).map(
                option => option.value
            );
            setFormData(prevData => ({
                ...prevData,
                [name]: selectedOptions
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    // Xử lý thay đổi giới tính (gender)
    const handleGenderChange = (event) => {
        const value = event.target.value === 'true';
        setFormData((prevData) => ({
            ...prevData,
            gender: value
        }));
    };


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
            gender: formData.gender,  // Giá trị gender
            imageUrl: formData.imageUrl,
            roleIds: formData.roleIds  // Gửi roleIds từ form
        };

        try {
            const response = await axiosConfig.post('http://localhost:8080/api/user', userRequest);
            alert("User added successfully!");
            navigate('/admin/users');
        } catch (error) {
            console.error("There was an error creating the user!", error);
            alert("Failed to add user");
        }
    };

    return (
        <div className="body">
            <div className="container mt-5">
                <div className="row tm-content-row">
                    <div className="col-10 tm-block-col">
                        <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
                            <h2 className="tm-block-title">List of Accounts</h2>
                            <p className="text-white">Accounts</p>
                            <select
                                className="custom-select"
                                multiple
                                name="roleIds"
                                value={formData.roleIds}
                                onChange={handleChange}
                            >
                                <option value="1">STAFF</option>
                                <option value="2">USER</option>
                                <option value="3">ADMIN</option>
                            </select>

                        </div>
                    </div>
                </div>
                <div className="row tm-content-row">
                    <div className="tm-block-col tm-col-avatar">
                        <div className="tm-bg-primary-dark tm-block tm-block-avatar">
                            <h2 className="tm-block-title">Change Avatar</h2>
                            <div className="tm-avatar-container">
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="tm-avatar img-fluid mb-4"
                                />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                id="avatarUpload"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            <label
                                htmlFor="avatarUpload"
                                className="btn btn-primary btn-block text-uppercase"
                            >
                                Upload New Photo
                            </label>

                        </div>
                    </div>
                    <div className="tm-block-col tm-col-account-settings">
                        <div className="tm-bg-primary-dark tm-block tm-block-settings">
                            <h2 className="tm-block-title">Account Settings</h2>
                            <form action="" className="tm-signup-form row" onSubmit={handleSubmit}>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="userName">Account Name</label>
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        className="form-control validate"
                                        value={formData.userName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="fullName">Full Name</label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        className="form-control validate"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="phoneNumber">Phone</label>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        className="form-control validate"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="email">Account Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control validate"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="form-control validate"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="password2">Re-enter Password</label>
                                    <input
                                        id="password2"
                                        name="password2"
                                        type="password"
                                        className="form-control validate"
                                        value={formData.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="address">Address</label>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        className="form-control validate"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-lg-6">
                                    <label htmlFor="birthday">Birthday</label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        className="form-control validate"
                                        value={formData.birthday}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Thêm trường Gender dưới dạng Select */}
                                <div className="form-group col-lg-6">
                                    <label htmlFor="genderSelect">Gender</label>
                                    <select
                                        id="genderSelect"
                                        name="gender"
                                        className="form-control"
                                        value={formData.gender ? "true" : "false"}  // Chuyển đổi boolean thành string
                                        onChange={(e) =>
                                            setFormData(prevData => ({
                                                ...prevData,
                                                gender: e.target.value === "true"  // Chuyển đổi giá trị string thành boolean
                                            }))
                                        }
                                    >
                                        <option value="true">Male</option>
                                        <option value="false">Female</option>
                                    </select>
                                </div>


                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-success btn-block text-uppercase"
                                    >
                                         Thêm
                                    </button>
                                </div>
                                <div className="col-12">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-block text-uppercase"
                                        onClick={() => navigate('/admin/users')}
                                    >
                                         Trở lại
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserFormList;
