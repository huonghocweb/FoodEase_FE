import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./UserList.css"; // CSS với các class mới
import axiosConfig from "../../../Config/AxiosConfig";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Định nghĩa hàm fetchUsers để lấy dữ liệu người dùng
  const fetchUsers = async () => {
    try {
      const response = await axiosConfig.get(
        "http://localhost:8080/api/user",
        {
          params: {
            pageNumber: 0,
            pageSize: 100,
            sortOrder: "asc",
            sortBy: "userId",
          },
        }
      );

      const sortedUsers = response.data.content.sort(
        (a, b) => a.userId - b.userId
      );
      setUsers(sortedUsers);
    } catch (error) {
      setError("Failed to load users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Gọi fetchUsers khi component được mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý chọn file để import
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Xử lý import dữ liệu người dùng từ file
  const handleImport = async () => {
    if (!file) {
        alert("Vui lòng chọn một tệp để tải lên.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosConfig.post("/user/importUser", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        alert(response.data); // Hiển thị thông báo thành công
        fetchUsers();
    } catch (error) {
        console.error("Có lỗi xảy ra khi nhập dữ liệu: ", error);
        alert("Có lỗi xảy ra khi nhập dữ liệu.");
    //   const response = await axiosConfig.post("/api/user/import", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   alert(response.data);
    //   // Tải lại danh sách người dùng sau khi import thành công
    //   fetchUsers();
    // } catch (error) {
    //   console.error("Error importing file:", error);
    //   alert("Error importing file");
    }
};

  const exportExcel = async () => {
    try {
        const response = await axiosConfig.get('/user/exportUser', {
            responseType: 'blob' // Để nhận phản hồi dưới dạng blob
        });

        // Tạo một URL cho blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        
        // Tạo một liên kết ảo để tải xuống tệp
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `users_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`); // Thiết lập tên tệp
        document.body.appendChild(link);
        link.click(); // Nhấp vào liên kết ảo để tải tệp
        document.body.removeChild(link); // Xóa liên kết
        console.log("Tải tệp thành công");
    } catch (error) {
        console.error('Tải tệp thất bại', error);
    }
}
  useEffect(() => {
    fetchUsers();
  }, []);

  // Xử lý export dữ liệu người dùng ra file
  const handleExport = async () => {
    try {
        const response = await axiosConfig.get("/api/user/export", {
            responseType: "blob", // Nhận dữ liệu dưới dạng blob
        });

        // Tạo URL từ blob nhận được
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Tạo liên kết tải file
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.xlsx"); // Đặt tên file là "users.xlsx"
        document.body.appendChild(link);

        // Kích hoạt sự kiện click để tải file
        link.click();

        // Xóa liên kết tạm thời
        link.remove();
    } catch (error) {
        console.error("Error exporting file:", error);
        alert("Failed to export file");
    }
};

  

  // Xử lý xóa người dùng
  const handleDelete = async (userId) => {
    try {
      await axiosConfig.delete(`http://localhost:8080/api/user/${userId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.userId !== userId)
      );
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleEdit = (user) => {
    navigate(`/admin/user/edit/${user.userId}`, { state: { user } });
};
  if (loading) {
    return <p className="user-loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="user-error-text">{error}</p>;
  }

  return (
    <div className="user-list-body">
      <div className="user-list-container">
        <h2 className="user-list-title">Account List</h2>

                  {/* Import/Export Section */}
                  <div className="import-export-container">
                    <h2>Import/Export Users</h2>
                    <div>
                      <input
                        type="file"
                       accept=".xlsx, .xls"
                        onChange={handleFileChange}
                      />
                      <div className="import-export-buttons">
                        <button
                          className="btn-import-export"
                          onClick={handleImport}
                        >
                          Import Users
                        </button>
                        <button
                          className="btn-import-export"
                          onClick={exportExcel}
                        >
                          Export Users
                        </button>
                      </div>
                    </div>
                  </div>
        {/* Button to create a new user */}
        <NavLink className="user-btn-create" to="/admin/user/create">
          New User
        </NavLink>

        {/* Import/Export Section */}
        <div className="user-import-export-container">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="user-file-input"
          />
          <div className="user-import-export-buttons">
            <button className="user-btn-import" onClick={handleImport}>
              Import Users
            </button>
            <button className="user-btn-export" onClick={handleExport}>
              Export Users
            </button>
          </div>
        </div>

        {/* Users Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>User NO.</th>
              <th>UserName</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Birthday</th>
              <th>Gender</th>
              <th>Image</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users
                .filter((user) => user.status)
                .map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.address}</td>
                    <td>{new Date(user.birthday).toLocaleDateString()}</td>
                    <td>{user.gender ? "Male" : "Female"}</td>
                    <td>
                      <img
                        src={user.imageUrl} // Đảm bảo rằng `user.imageUrl` là một URL đầy đủ
                        alt={`${user.fullName}'s avatar`}
                        className="user-avatar"
                      />
                    </td>

                    <td>{user.roles.map((role) => role.roleName).join(", ")}</td>
                    <td className="user-action-buttons">
                      <button
                        className="user-btn user-btn-edit"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="user-btn user-btn-delete"
                        onClick={() => handleDelete(user.userId)}
                      >
                        Disable
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="10" className="user-no-users-text">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
