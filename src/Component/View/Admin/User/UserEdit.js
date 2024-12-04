import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import './UserFormList.css';

const UserEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    console.log("Initial user data from location:", user);

    const [avatar, setAvatar] = useState(user?.imageUrl || 'img/avatar.png');
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        userName: user?.userName || '',
        fullName: user?.fullName || '',
        phoneNumber: user?.phoneNumber || '',
        email: user?.email || '',
        address: user?.address || '',
        birthday: user?.birthday?.split('T')[0] || '',
        gender: user?.gender || true,
        roleIds: user?.roles?.map(role => role.roleId) || [],
    });

    const [roles, setRoles] = useState([]);

    // Fetch roles and sync with user roles
    useEffect(() => {
        const fetchUserAndRoles = async () => {
            try {
                // Fetch user details
                const userResponse = await axiosConfig.get(`http://localhost:8080/api/user/${user.userId}`);
                const userData = userResponse.data.data;

                // Fetch all roles
                const rolesResponse = await axiosConfig.get("http://localhost:8080/api/roles");
                const allRoles = rolesResponse.data;

                // Set user data and roles
                setFormData({
                    ...formData,
                    userName: userData.userName,
                    roleIds: userData.roles.map(role => role.roleId), // Lấy roleId từ user
                });
                setRoles(allRoles);
            } catch (error) {
                console.error("Error fetching user or roles:", error);
            }
        };
        fetchUserAndRoles();
    }, [user.userId]);


    // Handle role selection changes
    const handleRoleChange = (event) => {
        const { value, checked } = event.target;
        const roleId = parseInt(value);
        setFormData(prevData => ({
            ...prevData,
            roleIds: checked
                ? [...prevData.roleIds, roleId]
                : prevData.roleIds.filter(id => id !== roleId),
        }));
    };

    // Handle avatar change
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setAvatar(URL.createObjectURL(file));
        }
    };

    // Submit form
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Filter roleIds to remove null/undefined
        const filteredRoleIds = formData.roleIds.filter(roleId => roleId != null);

        const formDataToSend = new FormData();
        formDataToSend.append('userName', formData.userName);
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('birthday', formData.birthday);
        formDataToSend.append('gender', formData.gender);
        formDataToSend.append('roleIds', JSON.stringify(filteredRoleIds));

        // Append image if a new file was selected
        if (imageFile) {
            formDataToSend.append('image', imageFile);
        }

        try {
            const response = await axiosConfig.put(
                `http://localhost:8080/api/user/${user.userId}`,
                formDataToSend
            );
            console.log('User updated:', response.data);
            alert('User updated successfully!');
            navigate('/admin/users');
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            alert('Failed to update user');
        }
    };

    const isRoleChecked = (roleId) => formData.roleIds.includes(roleId);

    return (
        <div className="user-form-container">
            <h2 className="user-form-title">Edit User</h2>

            {/* Avatar upload */}
            <div
                className="user-form-avatar-container"
                onClick={() => document.getElementById('avatarUpload').click()}
                style={{ cursor: 'pointer' }}
            >
                <img src={avatar} alt="User Avatar" className="user-form-avatar" />
                <input
                    type="file"
                    accept="image/*"
                    id="avatarUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>

            {/* Form */}
            <form className="user-form-signup-form row" onSubmit={handleSubmit}>
                <div className="form-group col-lg-6">
                    <label htmlFor="userName">Account Name</label>
                    <input
                        id="userName"
                        type="text"
                        className="form-control"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        type="text"
                        className="form-control"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input
                        id="phoneNumber"
                        type="tel"
                        className="form-control"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        type="text"
                        className="form-control"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        id="birthday"
                        type="date"
                        className="form-control"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group col-lg-6">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        className="form-control"
                        value={formData.gender ? 'true' : 'false'}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value === 'true' })}
                    >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                </div>
                <div className="form-group col-lg-6">
                    <label>Roles</label>
                    {roles.map((role) => (
                        <div key={role.roleId}>
                            <input
                                type="checkbox"
                                id={`role_${role.roleId}`}
                                value={role.roleId}
                                checked={formData.roleIds.includes(role.roleId)} // Đánh dấu nếu vai trò đã được chọn
                                onChange={handleRoleChange}
                            />
                            <label htmlFor={`role_${role.roleId}`}>{role.roleName}</label>
                        </div>
                    ))}


                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-success btn-block">
                        Update
                    </button>
                </div>
                <div className="col-12">
                    <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={() => navigate('/admin/users')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserEdit;
