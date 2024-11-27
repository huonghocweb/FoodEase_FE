import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import "./OrderStatus.css";
import OrderReturnFormPopUp from "./ReturnRequestFormPopup";

const OrderStatus = () => {
  const [selectedStatusId, setSelectedStatusId] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [pageCurrent, setPageCurrent] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("orderId");
  const [alert, setAlert] = useState(null);
  const [isOpenReturnForm, setIsOpentReturnForm] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [orderIdChoose, setOrderIdChoose] = useState();

  const userName = localStorage.getItem("userNameLogin");

  const fetchOrder = async () => {
    try {
      const resOrderByStatusId = await axiosConfig.get(
        `/order/orderHistoryByOrderStatus/${userName}`,
        {
          params: {
            pageCurrent: pageCurrent,
            pageSize: pageSize,
            sortOrder: sortOrder,
            sortBy: sortBy,
            orderStatusId: selectedStatusId,
          },
        }
      );
      setOrders(resOrderByStatusId.data.data.content);
      console.log(resOrderByStatusId.data.data.content);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch order status options
  const fetchOrderStatus = async () => {
    try {
      const resOrderStatus = await axiosConfig.get(`/orderStatus`);
      setOrderStatus(resOrderStatus.data.data);
      console.log(resOrderStatus.data.data);
    } catch (error) {
      console.error("Error fetching order statuses:", error);
    }
  };

  const handleOrderByStatus = (orderStatusId) => {
    setSelectedStatusId(orderStatusId);
  };

  const getOrderActions = (orderStatusId, order) => {
    const actions = {
      1: [
        {
          label: "Cancel Order",
          onClick: () =>
            handleCancelOrder(
              order,
              orderStatus.find((item) => item.orderStatusName === "Cancelled")
            ),
        },
        {
          label: "Payment Continue",
          onClick: () => handlePaymentContinue(order),
        },
      ],
      2: [
        {
          label: "Cancel Order",
          onClick: () =>
            handleCancelOrder(
              order,
              orderStatus.find((item) => item.orderStatusName === "Cancelled")
            ),
        },
      ],
      3: [{ label: "See Shipping", onClick: () => handleSeeShipping(order) }],
      4: [
        {
          label: "Complete Order",
          onClick: () =>
            handleCompleteOrder(
              order,
              orderStatus.find((item) => item.orderStatusName === "Completed")
            ),
        },
        { label: "Return Request", onClick: () => openOrderReturnForm(order) },
      ],
      5: [
        {
          label: "Cancel Return Request",
          onClick: () =>
            handleCancelReturnRequest(
              order,
              orderStatus.find((item) => item.orderStatusName === "Completed")
            ),
        },
      ],
      6: [{ label: "Review", onClick: () => handleReviewOrder(order) }],
    };
    return actions[orderStatusId] || [];
  };

  const handleCancelOrder = async (order, orderStatus) => {
    console.log(orderStatus);
    try {
      const resCancelOrder = await axiosConfig.get(
        `/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`
      );
      console.log(resCancelOrder.data);
      setAlert({
        type: "success",
        message: `Cancelling order: ${order.orderId}`,
      });
      fetchOrder();
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  const handlePaymentContinue = async (order) => {
    try {
      alert(`Continuing payment for order: ${order.orderId}`);
    } catch (error) {
      console.error("Error continuing payment:", error);
    }
  };

  const handleSeeShipping = async (order) => {
    try {
      alert(`Viewing shipping for order: ${order.orderId}`);
    } catch (error) {
      console.error("Error viewing shipping:", error);
    }
  };

  const handleCompleteOrder = async (order, orderStatus) => {
    try {
      const resCompleteOrder = await axiosConfig.get(
        `/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`
      );
      console.log(resCompleteOrder.data);
      setAlert({
        type: "success",
        message: `Complete Order orderId: ${order.orderId}`,
      });
      fetchOrder();
    } catch (error) {
      setAlert({
        type: "error",
        message: `Error Completing Order order: ${order.orderId}`,
      });
    }
  };

  const handleReturnRequestOrder = async (data) => {
    const formData = new FormData();
    const payload = {
      ...data,
      orderId: orderIdChoose,
    };
    console.log(payload);
    formData.append(
      "orderReturnRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    try {
      const resReturnRequestOrder = await axiosConfig.post(
        `/orderReturn`,
        formData
      );
      console.log(resReturnRequestOrder.data);
      if (resReturnRequestOrder.data.data !== null) {
        setAlert({
          type: "success",
          message: `Return Request Order order: ${orderIdChoose}`,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: `Return Request Order order: ${orderIdChoose} Failed`,
      });
    }
    setIsOpentReturnForm(!isOpenReturnForm);
  };

  const handleCancelReturnRequest = async (order, orderStatus) => {
    try {
      const resCancelReturnRequest = await axiosConfig.get(
        `/order/changeOrderStatus/${order.orderId}/${orderStatus.orderStatusId}`
      );
      console.log(resCancelReturnRequest.data);
      setAlert({
        type: "success",
        message: `Complete Order orderId: ${order.orderId}`,
      });
      fetchOrder();
    } catch (error) {
      setAlert({
        type: "success",
        message: `Error cancelling return request: orderId: ${order.orderId}`,
      });
    }
  };

  const handleReviewOrder = async (order) => {
    try {
      alert(`Reviewing order: ${order.orderId}`);
    } catch (error) {
      console.error("Error reviewing order:", error);
    }
  };

  const openOrderReturnForm = async (order) => {
    setOrderIdChoose(order?.orderId);
    setIsOpentReturnForm(!isOpenReturnForm);
  };
  useEffect(() => {
    fetchOrder();
    fetchOrderStatus();
  }, [pageCurrent, pageSize, sortOrder, sortBy, selectedStatusId]);

  return (
    <>
      <div className="order-status-container">
        {alert && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <header>
          <h1>{customTranslate("Order Status")}</h1>
          <ul className="order-status-bar">
            <li
              value={0}
              onClick={() => handleOrderByStatus(0)}
              className={selectedStatusId === 0 ? "active" : ""}
            >
              {customTranslate("All Orders")}
            </li>
            {orderStatus.map((item) => (
              <li
                key={item.orderStatusId}
                value={item.orderStatusId}
                className={
                  selectedStatusId === item.orderStatusId ? "active" : ""
                }
                onClick={() => handleOrderByStatus(item.orderStatusId)}
              >
                {customTranslate(`${item.orderStatusName}`)}
              </li>
            ))}
          </ul>
        </header>

        {/* Check if orders are null or empty */}
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-status">
              <div className="order-status-shop-info">
                <div className="price">
                  {customTranslate("Order Info")}: <span>{order.orderId}</span>
                </div>
                <div className="price">
                  {customTranslate("Order Date")}:{" "}
                  <span>
                    {order.orderTime} {order.orderDate}
                  </span>
                </div>
                <div className="price">
                  {customTranslate("Status")}:{" "}
                  <span>
                    {customTranslate(`${order.orderStatus.orderStatusName}`)}
                  </span>
                </div>
              </div>

              {order.orderDetails.map((item) => (
                <div key={item.orderDetailsId} className="order-status-details">
                  <img
                    // src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                    src={item.foodVariations.food.imageUrl}
                    alt="Product"
                    className="order-status-product-img"
                  />
                  <div className="order-status-product-info">
                    <p className="order-status-food-name">
                      {customTranslate(`${item.foodVariations.food.foodName}`)}
                    </p>
                    <p className="order-status-category-name">
                      {customTranslate("Category")}:{" "}
                      {customTranslate(
                        `${item.foodVariations.food.category.cartegoryName}`
                      )}
                    </p>
                    <p className="price-display">
                      {(
                        item.foodVariations.food.basePrice +
                        item.foodVariations.foodSize.price
                      ).toLocaleString("vi-VN")}
                      đ x {item.quantity} {customTranslate("items")}
                    </p>
                    <div className="order-status-actions">
                      {getOrderActions(
                        order.orderStatus.orderStatusId,
                        order
                      ).map((action, index) => (
                        <button
                          key={index}
                          className="order-status-return"
                          onClick={action.onClick}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <p className="price">
                {customTranslate("Total Price")}:{" "}
                <span>{order.totalPrice.toLocaleString()}₫</span>
              </p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "18px", color: "red" }}>
            {customTranslate("Not found Order")}{" "}
            <span>
              <i
                class="fa-solid fa-face-sad-cry fa-xl"
                style={{ color: "#63E6BE" }}
              ></i>{" "}
            </span>{" "}
          </p>
        )}
      </div>

      <OrderReturnFormPopUp
        openOrderReturnForm={openOrderReturnForm}
        isOpenReturnForm={isOpenReturnForm}
        register={register}
        handleSubmit={handleSubmit}
        handleReturnRequestOrder={handleReturnRequestOrder}
      />
    </>
  );
};

export default OrderStatus;
