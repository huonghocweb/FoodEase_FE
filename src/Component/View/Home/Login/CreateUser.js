import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = () => {
    const [formData, setFormData] = useState({
        userName: '',
        fullName: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        address: '',
        birthday: '',
        gender: true,
        roleIds: [2], // Mặc định là "User"
    });
    const [avatar, setAvatar] = useState(null); // Avatar image
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
        }
    };

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Prepare form data for multipart/form-data
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('userName', formData.userName);
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('address', formData.address);
        formDataToSubmit.append('birthday', formData.birthday);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('roleIds', JSON.stringify(formData.roleIds));
        formDataToSubmit.append('email', email);

        // Add image to form data
        if (avatar) {
            formDataToSubmit.append('image', avatar);
        }

        try {
            // Send request to server
            await axios.post('http://localhost:8080/api/user', formDataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Account created successfully!');
            navigate('/login');
        } catch (error) {
            alert('Failed to create account.');
            console.error('Error:', error);
        }
    };

    return (
        <div className="create-user-wrapper">
            <h2 className="create-user-header">Create Account</h2>
            <form className="create-user-form" onSubmit={handleCreateAccount}>
                {/* Avatar upload */}
                <div className="create-user-avatar-container">
                    <img
                        src={avatar ? URL.createObjectURL(avatar) : 'img/default-avatar.png'}
                        alt="Avatar"
                        className="create-user-avatar"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        id="avatarUpload"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="avatarUpload" className="create-user-avatar-upload">
                        Upload Avatar
                    </label>
                </div>

                {/* Account name */}
                <div className="create-user-form-group">
                    <label htmlFor="userName" className="create-user-label">Account Name</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        className="create-user-input"
                        value={formData.userName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Full name */}
                <div className="create-user-form-group">
                    <label htmlFor="fullName" className="create-user-label">Full Name</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="create-user-input"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Phone number */}
                <div className="create-user-form-group">
                    <label htmlFor="phoneNumber" className="create-user-label">Phone Number</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        className="create-user-input"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Password */}
                <div className="create-user-form-group">
                    <label htmlFor="password" className="create-user-label">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="create-user-input"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Confirm password */}
                <div className="create-user-form-group">
                    <label htmlFor="confirmPassword" className="create-user-label">Re-enter Password</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="create-user-input"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Address */}
                <div className="create-user-form-group">
                    <label htmlFor="address" className="create-user-label">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="create-user-input"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Birthday */}
                <div className="create-user-form-group">
                    <label htmlFor="birthday" className="create-user-label">Birthday</label>
                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        className="create-user-input"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Gender select */}
                <div className="create-user-form-group">
                    <label htmlFor="genderSelect" className="create-user-label">Gender</label>
                    <select
                        id="genderSelect"
                        name="gender"
                        className="create-user-input"
                        value={formData.gender ? 'true' : 'false'}
                        onChange={handleInputChange}
                    >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                </div>

                {/* Submit button */}
                <button type="submit" className="create-user-button">
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
