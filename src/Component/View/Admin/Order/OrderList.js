import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import axiosConfig from "../../../Config/AxiosConfig";
import ReturnRequestPopup from "../OrderReturn/ReturnRequestPopup";
import CustomAlert from "../../../Config/CustomAlert";
import InvoiceDownloadComponent from "./InvoiceDownloadComponent";
const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenReturnOrder, setIsOpentReturnOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderReturnByOrderId, setOrderReturnByOrderId] = useState([]);
  const [alert, setAlert] = useState(null);
  const featchOrderList = async () => {
    try {
      const responseOrder = await axiosConfig("/order/findAll").then(
        (responseOrder) => {
          setOrder(responseOrder.data);
          console.log(responseOrder.data);
        }
      );
    } catch (error) {
      console.log(error, "Lỗi nhận dử liệu order");
    }
  };

  const handleInfoClick = (item, order) => {
    setSelectedItem(item);
    setOrderDetails(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  const checkOrderReturnRequest = async (orderId) => {
    console.log(orderId);
    setIsOpentReturnOrder(!isOpenReturnOrder);
    try {
      const resOrderReturnByOrderId = await axiosConfig.get(
        `/orderReturn/byOrderId/${orderId}`
      );
      console.log(resOrderReturnByOrderId.data.data);
      setOrderReturnByOrderId(resOrderReturnByOrderId.data.data);
    } catch (error) {
      console.error("error in checkOrderReturnRequest", error);
    }
  };

  const hanldeApproveOrderReturn = async (orderId, isApprove) => {
    const formData = new FormData();
    formData.append(
      "isApprove",
      new Blob([JSON.stringify(isApprove)], { type: "application/json" })
    );
    try {
      const resOrderReturnApprove = await axiosConfig.put(
        `/orderReturn/isApprove/${orderId}`,
        formData
      );
      console.log(resOrderReturnApprove.data);
      if (isApprove === true && resOrderReturnApprove.data.data !== null) {
        setAlert({ type: "success", message: "Accept refund request! " });
      } else if (
        isApprove === false &&
        resOrderReturnApprove.data.data !== null
      ) {
        setAlert({ type: "error", message: "Refund request denied" });
      }
      setIsOpentReturnOrder(!isOpenReturnOrder);
      featchOrderList();
    } catch (error) {
      console.error("error in handle Approve OrderReturn", error);
    }
  };

  useEffect(() => {
    featchOrderList();
  }, []);
  return (
    <div className="body ">
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div id="reportsPage">
        <div id="home">
          <div className="container">
            <div className="row tm-content-row">
              <div className="col-12 tm-block-col">
                <div className=" ">
                  <h2 className="tm-block-title">Orders List</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th scope="col">ORDER NO.</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Order Time</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Delivery Address</th>
                        <th scope="col"> Order Status</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Ship Method</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Total Quantity</th>
                        <th scope="col">Funtion</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((item, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <th scope="row">#{item.orderId}</th>
                          <td>
                            {" "}
                            {(() => {
                              const orderDate = new Date(item.orderDate);
                              return `${orderDate.getFullYear()}/${String(
                                orderDate.getMonth() + 1
                              ).padStart(2, "0")}/${String(
                                orderDate.getDate()
                              ).padStart(2, "0")}`;
                            })()}
                          </td>

                          <td>
                            <b>{item.orderTime}</b>
                          </td>
                          <td>
                            <b>{item.user.fullName}</b>
                          </td>
                          <td>
                            <b>{item.deliveryAddress}</b>
                          </td>
                          <td>{item.orderStatus.orderStatusName}</td>
                          <td>{item.paymentMethod.paymentName}</td>
                          <td>{item.shipMethod.shipName}</td>
                          <td>{item.totalPrice.toLocaleString("vi-VN")}đ</td>
                          <td>{item.totalQuantity}</td>
                          <td
                            onClick={() => handleInfoClick(item.orderId, item)}
                          >
                            <i className="fa-solid fa-circle-info fa-lg"></i>
                          </td>
                          <td>
                            {" "}
                            {item.orderStatus.orderStatusName ===
                              "Return Requested" && (
                              <button
                                style={{ fontSize: "10px" }}
                                onClick={() =>
                                  checkOrderReturnRequest(item.orderId)
                                }
                              >
                                Check
                              </button>
                            )}
                          </td>
                          <td>
                            <InvoiceDownloadComponent orderId={item.orderId} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {isModalOpen && (
                    <Modal
                      item={selectedItem}
                      order={orderDetails}
                      onClose={handleCloseModal}
                    />
                  )}
                  <ReturnRequestPopup
                    isOpenReturnOrder={isOpenReturnOrder}
                    checkOrderReturnRequest={checkOrderReturnRequest}
                    orderReturnByOrderId={orderReturnByOrderId}
                    hanldeApproveOrderReturn={hanldeApproveOrderReturn}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
