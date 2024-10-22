import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Để điều hướng sang trang mới
import axiosConfig from "../../../Config/AxiosConfig";
import "./ResTable.css";

const ResTableList = () => {
  const [resTables, setResTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axiosConfig
      .get("/restables")
      .then((response) => {
        // Sắp xếp bàn mới nhất lên đầu, sắp xếp theo ID giảm dần
        const sortedTables = response.data.sort(
          (a, b) => b.tableId - a.tableId
        );
        setResTables(sortedTables);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (tableId) => {
    setSelectedTableId(tableId); // Lưu ID bàn đang chỉnh sửa
  };

  const handleSuccess = () => {
    fetchTables();
    setSelectedTableId(null); // Reset ID sau khi chỉnh sửa thành công
  };

  const handleDelete = (tableId) => {
    axiosConfig
      .delete(`/restables/delete/${tableId}`)
      .then(() => fetchTables())
      .catch((error) => {
        console.error("Lỗi xóa bàn: ", error);
        alert("Xóa không thành công. Vui lòng thử lại.");
      });
  };

  return (
    <div className="restable-list-container">
      <h1 className="restable-list-title">ResTable List</h1>
      <Link to="/admin/tables/new">
        <button>Thêm bàn mới</button>
      </Link>

      <table className="restable-list-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Table name</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Deposit</th>
            <th>Available</th>
            <th>URL Image</th>
            <th>Table category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {resTables.map((table, index) => (
            <tr key={table.tableId}>
              <td>{resTables.length - index}</td>{" "}
              {/* Số thứ tự ngược từ lớn đến nhỏ */}
              <td>{table.tableName}</td>
              <td>{table.capacity}</td>
              <td>{table.price}</td>
              <td>{table.deposit}</td>
              <td>{table.isAvailable ? "Có" : "Không"}</td>
              <td>
                <img src={table.imageUrl}></img>
              </td>
              <td>{table.tableCategory.tableCategoryName}</td>
              <td>
                <Link to={`/admin/tables/edit/${table.tableId}`}>
                  <button
                    className="restable-list-button"
                    onClick={() => handleEdit(table.tableId)}
                  >
                    Chỉnh sửa
                  </button>
                </Link>
                <button
                  className="restable-list-button"
                  onClick={() => handleDelete(table.tableId)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResTableList;
