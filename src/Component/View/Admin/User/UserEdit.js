import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import './UserFormList.css';

const UserEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    console.log("Initial user data from location:", user);

    // Khởi tạo state cho dữ liệu người dùng và avatar
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
        imageUrl: user?.imageUrl || '',
        roleIds: user?.roles?.map(role => role.roleId) || []
    });

    const [roles, setRoles] = useState([]);
    const [initialRoleIds, setInitialRoleIds] = useState(user?.roles?.map(role => role.id) || []);
    // Lấy danh sách vai trò từ backend
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axiosConfig.get('http://localhost:8080/api/roles');
                setRoles(response.data);

                // Log để kiểm tra danh sách vai trò
                console.log("Fetched roles:", response.data);

                // Thiết lập roleIds nếu user đã có vai trò
                if (user?.roles) {
                    const userRoleIds = user.roles.map(role => role.roleId);
                    setFormData(prevData => ({
                        ...prevData,
                        roleIds: userRoleIds,
                    }));
                    // Log để kiểm tra roleIds của user
                    setInitialRoleIds(userRoleIds);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        };
        fetchRoles();
    }, [user]);

    // Xử lý thay đổi khi người dùng chọn vai trò

    const handleRoleChange = (event) => {
        const { value, checked } = event.target;
        const roleId = parseInt(value);

        setFormData(prevData => {
            let updatedRoles = [...prevData.roleIds];
            if (checked) {
                // Thêm roleId nếu chưa có
                if (!updatedRoles.includes(roleId)) {
                    updatedRoles.push(roleId);
                }
            } else {
                // Loại bỏ roleId nếu có
                updatedRoles = updatedRoles.filter(id => id !== roleId);
            }

            return { ...prevData, roleIds: updatedRoles };
        });
    };


    // Xử lý khi người dùng chọn ảnh đại diện mới
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
            setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh đã chọn
        }
    };
    // Xử lý sự kiện nhấp chuột trên ảnh đại diện
    const handleAvatarClick = () => {
        document.getElementById('avatarUpload').click(); // Kích hoạt input ẩn
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const roleIdsToSend = formData.roleIds.length > 0 ? formData.roleIds : initialRoleIds;
        // Tạo FormData để gửi dữ liệu
        const formDataToSend = new FormData();
        formDataToSend.append('userName', formData.userName);
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('birthday', formData.birthday);
        formDataToSend.append('gender', formData.gender);

        // Nếu có ảnh mới, thêm vào FormData
        if (formData.imageUrl && typeof formData.imageUrl !== 'string') {
            formDataToSend.append('image', formData.imageUrl);
        }

        // Lọc các giá trị undefined hoặc null khỏi roleIds
        const filteredRoleIds = formData.roleIds.filter(roleId => roleId !== undefined && roleId !== null);
        formDataToSend.append('roleIds', JSON.stringify(filteredRoleIds));

        try {
            await axiosConfig.put(
                `http://localhost:8080/api/user/${user.userId}`,
                formDataToSend
            );
            alert('User updated successfully!');
            navigate('/admin/users');
        } catch (error) {
            if (error.response) {
                console.error('Error updating user:', error.response.data);
                alert(`Failed to update user: ${error.response.data}`);
            } else {
                console.error('Error updating user:', error.message);
                alert('Failed to update user');
            }
        }
    };
    // Hàm kiểm tra xem roleId có nằm trong roleIds của user không
    const isRoleChecked = (roleId) => {
        return formData.roleIds.includes(roleId);
    };


    return (
        <div className="user-form-container">
            <h2 className="user-form-title">Edit User</h2>

            {/* Phần tải lên ảnh đại diện */}
            <div className="user-form-avatar-container" onClick={handleAvatarClick} style={{ cursor: 'pointer' }}>
                <img src={avatar} alt="" className="user-form-avatar" />
                <input
                    type="file"
                    accept="image/*"
                    id="avatarUpload"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </div>

            {/* Form chỉnh sửa người dùng */}
            <form className="user-form-signup-form row" onSubmit={handleSubmit}>
                {/* Tên tài khoản */}
                <div className="form-group col-lg-6">
                    <label htmlFor="userName">Account Name</label>
                    <input
                        id="userName"
                        name="userName"
                        type="text"
                        className="form-control"
                        value={formData.userName}
                        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        required
                    />
                </div>

                {/* Tên đầy đủ */}
                <div className="form-group col-lg-6">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="form-control"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                </div>

                {/* Số điện thoại */}
                <div className="form-group col-lg-6">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        className="form-control"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group col-lg-6">
                    <label htmlFor="email">Account Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                </div>

                {/* Địa chỉ */}
                <div className="form-group col-lg-6">
                    <label htmlFor="address">Address</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        className="form-control"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                    />
                </div>

                {/* Ngày sinh */}
                <div className="form-group col-lg-6">
                    <label htmlFor="birthday">Birthday</label>
                    <input
                        id="birthday"
                        name="birthday"
                        type="date"
                        className="form-control"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                        required
                    />
                </div>

                {/* Giới tính */}
                <div className="form-group col-lg-6">
                    <label htmlFor="genderSelect">Gender</label>
                    <select
                        id="genderSelect"
                        name="gender"
                        className="form-control"
                        value={formData.gender ? "true" : "false"}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value === 'true' })}
                    >
                        <option value="true">Male</option>
                        <option value="false">Female</option>
                    </select>
                </div>

                {/* Vai trò */}
                <div className="form-group col-lg-6">
                    <label htmlFor="roleIds">Role</label>
                    <div className="role-checkboxes">
                        {roles.map(role => (
                            <div key={role.roleId}>
                                <input
                                    type="checkbox"
                                    id={`role_${role.roleId}`}
                                    value={role.roleId}
                                    checked={isRoleChecked(role.roleId)}
                                    onChange={handleRoleChange}
                                />
                                <label htmlFor={`role_${role.roleId}`} style={{ marginLeft: '5px' }}>
                                    {role.roleName}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>


                {/* Nút Lưu và Hủy */}
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
    );
};

export default UserEdit;
