import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"; // Để điều hướng sang trang mới
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Service.css";

const ServiceList = () => {
  const [tableServices, setTableServices] = useState([]);
  const [selectedTableServicesId, setSelectedTableServicesId] = useState(null);
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axiosConfig
      .get("/tableService/fill")
      .then((response) => {
        // Sắp xếp bàn mới nhất lên đầu, sắp xếp theo ID giảm dần
        const sortedServices = response.data.sort(
          (a, b) => b.serviceId - a.serviceId
        );
        setTableServices(sortedServices);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  const handleEdit = (serviceId) => {
    setSelectedTableServicesId(serviceId); // Lưu ID bàn đang chỉnh sửa
  };

  const handleSuccess = () => {
    fetchServices();
    setSelectedTableServicesId(null); // Reset ID sau khi chỉnh sửa thành công
  };

  const handleDelete = (serviceId) => {
    axiosConfig
      .delete(`/tableService/delete/${serviceId}`)
      .then(() => fetchServices())
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
                  <h1 className="restable-list-title">
                    {customTranslate("Service List")}
                  </h1>
                  <NavLink
                    className="btn btn-primary"
                    to="/admin/tableService/new"
                    style={{
                      display: "flex",
                      width: "150px",
                      float: "right",
                    }}
                  >
                    {customTranslate("Create Service")}
                  </NavLink>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">{customTranslate("No.")}</th>
                        <th>{customTranslate("Image")}</th>
                        <th scope="col">{customTranslate("Service Name")}</th>
                        <th scope="col">{customTranslate("Price")}</th>
                        <th scope="col">{customTranslate("Description")}</th>
                        <th colSpan={2}>{customTranslate("Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableServices.map((tableService, index) => (
                        <tr key={tableService.serviceId}>
                          <td>{tableServices.length - index}</td>{" "}
                          {/* Số thứ tự ngược từ lớn đến nhỏ */}
                          <td>
                            <img
                              style={{ width: "80px" }}
                              src={tableService.imageUrl}
                            ></img>
                          </td>
                          <td>
                            {customTranslate(`${tableService.serviceName}`)}
                          </td>
                          <td>{tableService.servicePrice}</td>
                          <td>
                            {customTranslate(`${tableService.description}`)}
                          </td>
                          <td>
                            <NavLink
                              to={`/admin/tableService/edit/${tableService.serviceId}`}
                              onClick={() => handleEdit(tableService.serviceId)}
                            >
                              <i class="fa-solid fa-gear fa-lg"></i>
                            </NavLink>
                          </td>
                          <td>
                            <NavLink>
                              <i
                                class="fa-solid fa-trash fa-lg"
                                onClick={() =>
                                  handleDelete(tableService.serviceId)
                                }
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

export default ServiceList;
