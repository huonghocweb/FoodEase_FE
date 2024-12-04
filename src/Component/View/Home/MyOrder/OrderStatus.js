import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import "./OrderStatus.css";
import OrderReturnFormPopUp from "./ReturnRequestFormPopup";
import PaginationControls from "../../../Include/Pagination/PaginationControls";
import OrderDetailsPopup from "./OrderDetailsPopup";

const OrderStatus = () => {
  const [selectedStatusId, setSelectedStatusId] = useState(0);
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [alert, setAlert] = useState(null);
  const [isOpenReturnForm, setIsOpentReturnForm] = useState(null);
  const [isOpentDetailsPopup,setIsOpentDetailsPopup] = useState(null);
  const [orderByOrderId,setOrderByOrderId] = useState();  
  const baseUrlReturn = window.location.origin;
  const [paginationState,setPaginationState] = useState({
    pageCurrent : 0,
    pageSize : 8,
    sortOrder : 'desc',
    sortBy : 'orderId',
    totalPage : ''
  })

  const handleChangePaginationState = (name,value) => {
    setPaginationState(prev => ({
      ...prev , 
      [name] : value
    }))
  }

  const handleOpenOrderDetailsPopup = () => {
    setIsOpentDetailsPopup(!isOpentDetailsPopup);
  }

  const getOrderByOrderId = async(orderId) => {
    console.log(orderId);
    try {
      const orderByOrderId = await axiosConfig.get(`/order/byId/${orderId}`);
      console.log(orderByOrderId.data.data);
      setOrderByOrderId(orderByOrderId.data.data);
      handleOpenOrderDetailsPopup();
    } catch (error) {
      console.error('error in get Order By OrderID',error);
    }
  }

  const sortOptions = [
    {label : 'Order Id' , value : 'orderId'},
    {label : 'User Id' , value : 'userId'},
    {label : 'Total Price ' , value : 'totalPrice'},
    {label : 'Total Quantity ' , value : 'totalQuatity'},
    {label : 'Payment Date Time  ' , value : 'paymentDatetime'}
  ]
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
            pageCurrent: paginationState.pageCurrent,
            pageSize: paginationState.pageSize,
            sortOrder: paginationState.sortOrder,
            sortBy: paginationState.sortBy,
            orderStatusId: selectedStatusId,
          },
        }
      );
      if(resOrderByStatusId.data.data){
        setOrders(resOrderByStatusId.data.data.content);
        console.log(resOrderByStatusId.data.data);
        handleChangePaginationState('totalPage',resOrderByStatusId.data.data.totalPages);
        handleChangePaginationState('pageCurrent',resOrderByStatusId.data.data.pageable.pageNumber);
      }else{
        setOrders(null);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Fetch order status options
  const fetchOrderStatus = async () => {
    try {
      const resOrderStatus = await axiosConfig.get(`/orderStatus`);
      setOrderStatus(resOrderStatus.data.data);
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
    console.log(order.orderId);
    console.log(baseUrlReturn);
    try {
      const resURLPayment = await axiosConfig.get(`/payment/paymentContinue/${order.orderId}`, {
        params : {
          baseUrlReturn : baseUrlReturn
        }
      });
      console.log(resURLPayment.data);
      window.location.href = resURLPayment.data.data;
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
    setOrderByOrderId(order);
    console.log('order choose ',order);
    setIsOpentReturnForm(!isOpenReturnForm);
  };
  useEffect(() => {
    fetchOrder();
    fetchOrderStatus();
  }, [...Object.values(paginationState) , selectedStatusId]);

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
        <PaginationControls 
          paginationState={paginationState}
          handlePaginationChange={handleChangePaginationState}
          sortOptions={sortOptions}
        />
        {/* Check if orders are null or empty */}
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <>
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
                <>
                <div key={item.orderDetailsId} className="order-status-details">
                  <img
                    // src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                    src={item.foodVariations.food.imageUrl}
                    alt="Product"
                    className="order-status-product-img"
                    style={{borderRadius : '15px'}}
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
                  </div>
                </div>

                </>
              ))}
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
                      <button 
                      onClick={() => getOrderByOrderId(order.orderId)}
                      className="order-status-return" 
                      >See Details</button>
                  </div>
              <p className="price">
                {customTranslate("Total Price")}:{" "}
                <span>{order.totalPrice.toLocaleString()}₫</span>
              </p>
            </div>
            </>
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
        orderByOrderId = {orderByOrderId}
      />
      <OrderDetailsPopup
      isOpenOrderDetails={isOpentDetailsPopup}
      handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
      orderByOrderId={orderByOrderId}
       />
    </>
  );
};

export default OrderStatus;
