import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Để điều hướng sang trang mới
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
    <div className="body">
      <div id="reportsPage">
        <div id="home">
          <div className="container">
            <div className="row tm-content-row">
              <div className="col-12 tm-block-col">
                <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                  <h1 className="restable-list-title">ResTable List</h1>
                  <NavLink
                    className="btn btn-primary"
                    to="/admin/tables/new"
                    style={{
                      display: "flex",
                      width: "150px",
                      float: "right",
                    }}
                  >
                    Create ResTable
                  </NavLink>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Table name</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Deposit</th>
                        <th scope="col">Available</th>
                        <th>URL Image</th>
                        <th scope="col">Table category</th>
                        <th colSpan={2}>Action</th>
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
                            <img style={{width:"80px"}} src={table.imageUrl}></img>
                          </td>
                          <td>{table.tableCategory.tableCategoryName}</td>
                          <td>
                            <NavLink
                              to={`/admin/tables/edit/${table.tableId}`}
                              onClick={() => handleEdit(table.tableId)}
                            >
                              <i class="fa-solid fa-gear fa-lg"></i>
                            </NavLink>
                          </td>
                          <td>
                            <NavLink>
                              <i
                                class="fa-solid fa-trash fa-lg"
                                onClick={() => handleDelete(table.tableId)}
                              ></i>
                            </NavLink>
                          </td>
                        </tr>
                      ))}
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

export default ResTableList;
