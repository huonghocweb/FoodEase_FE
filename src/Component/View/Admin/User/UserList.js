import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState({}); // Trạng thái hiển thị password cho từng người dùng
    const navigate = useNavigate();  // Sử dụng để điều hướng

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosConfig.get('http://localhost:8080/api/user', {
                    params: {
                        pageNumber: 0,
                        pageSize: 10,
                        sortOrder: 'asc',
                        sortBy: 'userName'
                    }
                });

                if (response.data.content) {
                    setUsers(response.data.content);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                setError('Failed to load users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        try {
            const response = await axiosConfig.delete(`http://localhost:8080/api/user/${userId}`);
            console.log('User disabled successfully', response.data);
            // Có thể thêm thông báo thành công ở đây
        } catch (error) {
            if (error.response) {
                // Máy chủ đã phản hồi với mã lỗi khác 2xx
                console.error('Error disabling user:', error.response.data);
                alert(`Failed to disable user: ${error.response.status} - ${error.response.data.message || 'Server error'}`);
            } else if (error.request) {
                // Không nhận được phản hồi từ máy chủ
                console.error('No response from server:', error.request);
                alert('Failed to disable user: No response from server.');
            } else {
                // Một lỗi khác khi thiết lập yêu cầu
                console.error('Error setting up request:', error.message);
                alert('Error setting up request: ' + error.message);
            }
        }
    };
    


    const handleEdit = (user) => {
        // Chuyển sang trang edit, truyền dữ liệu người dùng qua state
        navigate(`/admin/edit`, { state: { user: { ...user, password: user.password } } });
    };
    

    const togglePasswordVisibility = (userId) => {
        setShowPassword((prev) => ({
            ...prev,
            [userId]: !prev[userId], // Đổi trạng thái hiển thị password cho người dùng này
        }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="body">
            <div id="reportsPage">
                <div id="home">
                    <div className="container">
                        <div className="row tm-content-row">
                            <div className="col-12 tm-block-col">
                                <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                                    <h2 className="tm-block-title">Account List</h2>
                                    <NavLink className="btn btn-primary" to="/admin/user/create" style={{ display: 'flex', width: '150px' }}>
                                        New User
                                    </NavLink>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">User NO.</th>
                                                <th scope="col">UserName</th>
                                                <th scope="col">FullName</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Phone Number</th>
                                                <th scope="col">Address</th>
                                                <th scope="col">Birthday</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Password</th>
                                                <th scope="col">Roles</th> {/* Add a column for roles */}
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users && users.length > 0 ? (
                                                users.filter(user => user.status)
                                                    .map((user) => (
                                                        <tr key={user.userId}>
                                                            <th scope="row"><b>#{user.userId}</b></th>
                                                            <td><b>{user.userName}</b></td>
                                                            <td><b>{user.fullName}</b></td>
                                                            <td><b>{user.email}</b></td>
                                                            <td>{user.phoneNumber}</td>
                                                            <td>{new Date(user.birthday).toLocaleDateString()}</td>
                                                            <td>{user.address}</td>
                                                            <td>
                                                                <img src={`http://localhost:8080${user.imageUrl}`} alt={`${user.fullName}'s avatar`} className="user-image" />
                                                            </td>
                                                            <td>
                                                                <b>{showPassword[user.userId] ? user.password : '******'}</b>
                                                                <button onClick={() => togglePasswordVisibility(user.userId)}>
                                                                    {showPassword[user.userId] ? 'Hide' : 'Show'}
                                                                </button>
                                                            </td>
                                                            <td>{user.roles.map(role => role.name).join(', ')}</td> {/* Display roles */}
                                                            <td>
                                                                <button className="btn btn-edit" onClick={() => handleEdit(user)}>
                                                                    Edit
                                                                </button>
                                                                <button className="btn btn-delete" onClick={() => handleDelete(user.userId)}>
                                                                    Disable
                                                                </button>
                                                                <button className="btn btn-reset" onClick={() => handleDelete(user.userId)}>
                                                                Reset
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="10" className="text-center">No users found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
