import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import ReturnRequestPopup from "../OrderReturn/ReturnRequestPopup";
import InvoiceDownloadComponent from "./InvoiceDownloadComponent";
import Modal from "./Modal";
import "./Modal.css";
import OrderStatusPopup from "./OrderStatusPopup";
const OrderList = () => {
  const [order, setOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenReturnOrder, setIsOpentReturnOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderReturnByOrderId, setOrderReturnByOrderId] = useState([]);
  const [alert, setAlert] = useState(null);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(0);
  const [inputFind, setInputFind] = useState("");
  const [TotalPage, setTotalPage] = useState();
  const [endDate, setEndDate] = useState("");
  const [inputFindEndDate, setinputFindEndDate] = useState("");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [sortBy, setSortBy] = useState("orderDate");



  const [isOpenOrderStatus, setIsOpenOrderStatus] = useState(null);
  const [orderById ,setOrderById] = useState();

  const handleOpenOrderStatus = async (orderId) => {
    setIsOpenOrderStatus(!isOpenOrderStatus);
    try {
      const resOrderById = await axiosConfig.get(`/order/byId/${orderId}`);
      console.log(resOrderById.data.data);
      setOrderById(resOrderById.data.data);
    } catch (error) {
      console.error('error in handle Open OrderStatus !',error);
    }
  }
 
  const handleSort = (columnName) => {
    if (columnName === sortBy) {
      setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
    } else {
      setSortBy(columnName);
      setSortDirection("ASC");
    }
  };
  const featchOrderList = async () => {
    try {
      const responseOrder = await axiosConfig(
        `/order/findOrderByOrderDate?date=${date}&EndDate=${endDate}&page=${page}&sortBy=${sortBy}&sortDirection=${sortDirection}`
      ).then((responseOrder) => {
        setOrder(responseOrder.data.content);
        setTotalPage(responseOrder.data.totalPages);
      });
    } catch (error) {
      console.log(error, "Lỗi nhận dử liệu order");
    }
  };
  const handleinputFind = (e) => {
    setInputFind(e.target.value);
    console.log(e.target.value);
  };
  const handleinputFindendDate = (e) => {
    setinputFindEndDate(e.target.value);
  };
  const findDate = () => {
    const formattedDate = inputFind.replace(/\//g, "-");
    const formattedEndDate = inputFindEndDate.replace(/\//g, "-");
    setDate(formattedDate);
    setEndDate(formattedEndDate);
    if (inputFind == null) {
      setDate("");
    }
    if (inputFindEndDate == null) {
      setEndDate("");
    }
    console.log(inputFind);
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

  const handleOpentOrderReturnRequest = () => {
    setIsOpentReturnOrder(!isOpenReturnOrder);
  }


  const checkOrderReturnRequest = async (orderId) => {
    console.log(orderId);
    handleOpentOrderReturnRequest();
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
    formData.append("isApprove",new Blob([JSON.stringify(isApprove)], { type: "application/json" }));
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

  const handleChangeOrderStatus = async(orderId) => {
    const orderStatusId = 3;
    try {
      const resOrderChangeStatus = await axiosConfig.get(`/order/changeOrderStatus/${orderId}/${orderStatusId}`);
     
      if(resOrderChangeStatus.data !== null){
        setAlert({ type: "success", message : 'Change Order Status To Shipping !'});
        
      }else {
        setAlert({type : "error", message : 'Change Order Status Failed !'});
      }

      setTimeout(() => {
        setAlert(null);
        handleOpenOrderStatus();
        window.location.reload();
      } , 2000);
     
      console.log(resOrderChangeStatus.data.data);
      featchOrderList();
    } catch (error) {
      console.error('error in handle Change Order Status',error);
    }
  }


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
    featchOrderList();
  }, [order ]);
  return (
    <>
             {alert && (
                <CustomAlert
                  type={alert.type}
                  message={alert.message}
                  onClose={() => {
                    console.log("Closing alert");
                    setAlert(null);
                  }}
                />
              )}


    <div className="body ">
     
      <div id="reportsPage">
        <div id="home">
          <div className="container">
            <div className="row tm-content-row">
              <div className="col-12 tm-block-col">
                <div className=" ">
                  <h2 className="tm-block-title">
                    {customTranslate("Orders List")}
                  </h2>
                  <div className="orderlist-find">
                    <input
                      type="date"
                      value={inputFind}
                      onChange={handleinputFind}
                    />
                    <input
                      type="date"
                      value={inputFindEndDate}
                      onChange={handleinputFindendDate}
                    />
                    <button onClick={findDate}>
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">{customTranslate("Order No.")}</th>
                        <th scope="col" onClick={() => handleSort("orderDate")}>
                          {customTranslate("Order Date")}
                          {sortBy === "orderDate" &&
                            (sortDirection === "ASC" ? "▲" : "▼")}
                        </th>
                        <th scope="col">{customTranslate("Order Time")}</th>
                        <th scope="col">{customTranslate("UserName")}</th>
                        <th scope="col">
                          {customTranslate("Delivery Address")}
                        </th>
                        <th scope="col">{customTranslate("Payment Method")}</th>
                        <th scope="col">{customTranslate("Ship Method")}</th>
                        <th scope="col">{customTranslate("Total Price")}</th>
                        <th scope="col">{customTranslate("Total Quantity")}</th>
                        <th scope="col">{customTranslate("Order Status")}</th>
                        <th scope="col">{customTranslate("Function")}</th>
                        <th scope="col">{customTranslate("Export")}</th>
                        <th scope="col"> Manage Status </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>

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
                       
                          <td>{item.paymentMethod.paymentName}</td>
                          <td>
                            {customTranslate(`${item.shipMethod.shipName}`)}
                          </td>
                          <td>{item.totalPrice.toLocaleString("vi-VN")}đ</td>
                          <td>{item.totalQuantity}</td>
                          <td>
                            {customTranslate(
                              `${item.orderStatus.orderStatusName}`
                            )}
                          </td>
                          <td
                            onClick={() => handleInfoClick(item.orderId, item)}
                          >
                            <i className="fa-solid fa-circle-info fa-lg"></i>
                          </td>
                          <td>
                            <InvoiceDownloadComponent orderId={item.orderId} />
                          </td>
                          <td>
                            {" "}
                            {item.orderStatus.orderStatusId === 5
                               ?  (
                              <button
                                style={{ fontSize: "10px" }}
                                onClick={() =>
                                  checkOrderReturnRequest(item.orderId)
                                }
                              >
                                {customTranslate("Check")}
                              </button>
                            ) :  item.orderStatus.orderStatusId === 2 ? (
                              <button
                                style={{ fontSize: "10px" }}
                                onClick={() => handleOpenOrderStatus(item.orderId)}
                              >
                                {customTranslate("Check")}
                              </button> 
                            ) : ('')
                            }
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
                  {isModalOpen && (
                    <Modal
                      item={selectedItem}
                      order={orderDetails}
                      onClose={handleCloseModal}
                    />
                  )}
                  <ReturnRequestPopup
                    isOpenReturnOrder={isOpenReturnOrder}
                    handleOpentOrderReturnRequest ={handleOpentOrderReturnRequest}
                    orderReturnByOrderId={orderReturnByOrderId}
                    hanldeApproveOrderReturn={hanldeApproveOrderReturn}
                  />
                  <OrderStatusPopup
                    isOpenOrderStatus={isOpenOrderStatus}
                    orderById={orderById}
                    handleChangeOrderStatus= {handleChangeOrderStatus}
                    setIsOpenOrderStatus = {setIsOpenOrderStatus}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderList;
