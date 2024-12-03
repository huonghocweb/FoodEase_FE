import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Inventory.css";
const Iventory = () => {
  const [invnetory, setInventory] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [page, setPage] = useState(0);
  const [TotalPage, setTotalPage] = useState();
  const fetchInventory = async () => {
    await axiosConfig
      .get(`/user/foodvariation/findAll?page=${page}`)
      .then((response) => {
        setInventory(response.data.content);
        console.log(response.data.content);
        setTotalPage(response.data.totalPages);
      });
  };
  const Next = () => {
    setPage((prevPage) => {
      if (prevPage >= TotalPage - 1) {
        return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
      }
      return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
    });
  };
  const Previous = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };
  useEffect(() => {
    fetchInventory();
  }, [page]);
  return (
    <div className="revenue-container">
      <table className="revenue-table ">
        <thead>
          <tr>
            <th className="revenue-th">{customTranslate("No.")}</th>
            <th className="revenue-th">{customTranslate("CreatedAt")}</th>
            <th className="revenue-th">{customTranslate("Food Name")}</th>
            <th className="revenue-th">{customTranslate("Image")}</th>
            <th className="revenue-th">{customTranslate("Food Size Name")}</th>
            <th className="revenue-th">{customTranslate("Description")}</th>
            <th className="revenue-th">{customTranslate("Base Price")}</th>
            <th className="revenue-th">{customTranslate("Quantity Stock")}</th>
          </tr>
        </thead>
        <tbody>
          {invnetory.map((item, index) => (
            <tr key={index}>
              <td className="revenue-td">{index + 1}</td>
              <td className="revenue-td">
                {" "}
                {(() => {
                  const orderDate = new Date(item.food.createdAt);
                  return `${orderDate.getFullYear()}/${String(
                    orderDate.getMonth() + 1
                  ).padStart(2, "0")}/${String(orderDate.getDate()).padStart(
                    2,
                    "0"
                  )}`;
                })()}
              </td>

              <td className="revenue-td">
                {customTranslate(`${item.food.foodName}`)}
              </td>
              <td className="revenue-td">
                <img className="inventory-img" src={`${item.food.imageUrl}`} />
              </td>
              <td className="revenue-td">
                {customTranslate(`${item.foodSize.foodSizeName}`)}
              </td>
              <td className="revenue-td">
                {customTranslate(`${item.food.description}`)}
              </td>
              <td className="revenue-td">
                {item.food.basePrice.toLocaleString("vi-vn")}đ
              </td>
              <td
                className={`revenue-td ${
                  item.quantityStock === 0 ? "low-stock" : ""
                }`}
              >
                {item.quantityStock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h6>
        {page + 1}/{TotalPage}
      </h6>
      <button className="Button-Previous" onClick={Previous}>
        {customTranslate("Previous")}
      </button>
      <button className="Button-next" onClick={Next}>
        {customTranslate("Next")}
      </button>
    </div>
  );
};
export default Iventory;
