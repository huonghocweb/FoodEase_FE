import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './UserFormList.css';
import axiosConfig from '../../../Config/AxiosConfig';

const UserEdit = () => {
    const location = useLocation();  
    const navigate = useNavigate();
    const user = location.state?.user;  

    const [avatar, setAvatar] = useState(user?.imageUrl || 'img/avatar.png');
    const [formData, setFormData] = useState({
        userName: user?.userName || '',
        fullName: user?.fullName || '',
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '',
        password: '',  
        password2: '', 
        address: user?.address || '',
        birthday: user?.birthday?.split('T')[0] || '',  
        gender: user?.gender || true,
        imageUrl: user?.imageUrl || '',
        roleIds: user?.roles?.map(role => role.id) || []  // Đảm bảo lấy roleIds từ user
    });

    const [roles, setRoles] = useState([]);  // State để lưu danh sách vai trò

    useEffect(() => {
        // Lấy danh sách vai trò từ API
        const fetchRoles = async () => {
            try {
                const response = await axiosConfig.get('http://localhost:8080/api/roles'); // Thay đổi URL cho phù hợp
                setRoles(response.data); // Giả sử response.data chứa mảng các vai trò
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };

        fetchRoles();
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatar(imageUrl);
            setFormData(prevData => ({ ...prevData, imageUrl: file }));
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

    const handleGenderChange = (event) => {
        const value = event.target.value === 'true';
        setFormData((prevData) => ({
            ...prevData,
            gender: value
        }));
    };

    const handleRoleChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setFormData(prevData => ({
            ...prevData,
            roleIds: selectedOptions
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userRequest = {
                userName: formData.userName,
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                email: formData.email,
                password: formData.password || undefined, 
                address: formData.address,
                birthday: formData.birthday,
                gender: formData.gender,
                imageUrl: formData.imageUrl,
                roleIds: formData.roleIds
            };

            await axiosConfig.put(`http://localhost:8080/api/user/${user.userId}`, userRequest);
            alert('User updated successfully!');
            navigate('/admin/users');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    return ( 
        <div className="body">
            <div className="container mt-5">
                <h2>Edit User</h2>
                <form className="tm-signup-form row" onSubmit={handleSubmit}>
                <div className="form-group col-lg-6">
                        <div className="tm-bg-primary-dark tm-block tm-block-avatar">
                            <h2 className="tm-block-title ">Change Avatar</h2>
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
                    <div className="form-group col-lg-6">
                    <div className="form-group col-lg-6">
                        <label htmlFor="roles">Roles</label>
                        <select
                            id="roles"
                            name="roleIds"
                            multiple
                            className="form-control"
                            value={formData.roleIds}
                            onChange={handleChange}
                        >
                            {roles.map((role) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                    {/* Các trường khác */}
                    <div className="form-group col-12">
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
                        <label htmlFor="password">Password (Leave blank to keep the same)</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control validate"
                            value={formData.password}
                            onChange={handleChange}
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

                    {/* Trường giới tính */}
                    <div className="form-group col-lg-6">
                        <label htmlFor="genderSelect">Gender</label>
                        <select
                            id="genderSelect"
                            name="gender"
                            className="form-control"
                            value={formData.gender ? "true" : "false"}
                            onChange={handleGenderChange}
                        >
                            <option value="true">Male</option>
                            <option value="false">Female</option>
                        </select>
                    </div>

                  

                    {/* Nút submit và nút hủy */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-success btn-block text-uppercase">
                             Update
                        </button>
                    </div>
                    <div className="col-12">
                        <button
                            type="button"
                            className="btn btn-secondary btn-block text-uppercase"
                            onClick={() => navigate('/admin/users')}
                        >
                             Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;
