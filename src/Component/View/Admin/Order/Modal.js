import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Modal.css";
const Modal = ({ item, order, onClose }) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const featchOrderDetails = async () => {
    try {
      const responseOrder = await axiosConfig(
        `orderDetails/orderDetailsHistory/${item}`
      ).then((responseOrder) => {
        setOrderDetails(responseOrder.data.data);
        console.log(responseOrder.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    featchOrderDetails();
  }, []);
  if (!item) return null;
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <span className="custom-close" onClick={onClose}>
          &times;
        </span>
        <h3>{customTranslate("Thanks for your order")}</h3>
        <h4 className="order-Receipt">{customTranslate("Receipt")}</h4>

        <div>
          {orderDetails.map((item) => (
            <div className="custom-modal-body">
              <img
                className="order-image"
                src={`${item.foodVariations.food.imageUrl}`}
                alt={item.foodVariations.food.foodName}
              />
              <div className="order-details">
                <h4>
                  {customTranslate(`${item.foodVariations.food.foodName}`)}
                </h4>
                <h4>
                  {customTranslate("Size")}:{" "}
                  {customTranslate(
                    `${item.foodVariations.foodSize.foodSizeName}`
                  )}
                </h4>
                <h4>
                  {customTranslate("Quantity")}: {item.quantity}
                </h4>
                <h4>
                  {customTranslate("Price")}:{" "}
                  {item.price.toLocaleString("vi-VN")}đ
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className="order-details-container">
          <div className="order-detail-item">
            <span className="detail-label">{customTranslate("Total")}:</span>
            <span className="detail-value">
              {order.totalPrice.toLocaleString("vi-Vn")}đ
            </span>
          </div>

          <div className="order-detail-item">
            <span className="detail-label">
              {customTranslate("Total Quantity")}
            </span>
            <span className="detail-value">{order.totalQuantity}</span>
          </div>

          <div className="order-detail-item">
            <span className="detail-label">{customTranslate("Shipping fee")}:</span>
            <span className="detail-value">
              {order.shipMethod.shipFee.toLocaleString("vi-vn")}đ
            </span>
          </div>

          <div className="order-detail-item">
            <span className="detail-label">
              {customTranslate("Invoice Date")}:
            </span>
            <span className="detail-value">
              {" "}
              {(() => {
                const orderDate = new Date(order.orderDate);
                return `${orderDate.getFullYear()}/${String(
                  orderDate.getMonth() + 1
                ).padStart(2, "0")}/${String(orderDate.getDate()).padStart(
                  2,
                  "0"
                )}`;
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
