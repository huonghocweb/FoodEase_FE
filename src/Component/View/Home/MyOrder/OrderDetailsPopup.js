import React from "react";
import "./OrderDetailsPopup.css";

const OrderDetailsPopup = ({ isOpenOrderDetails ,handleOpenOrderDetailsPopup , orderByOrderId }) => {

  console.log(orderByOrderId);
  if(!orderByOrderId ){
    return (
      <p>Loading ... </p>
    )
  }
  return (
    <>
      {isOpenOrderDetails && (
        <div className="details-popup-overlay">
          <div className="details-popup-container">
            <section className="">
              <div className=" py-4">
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-12">
                    <div
                      className="card border-top border-bottom border-3"
                      style={{
                        backgroundColor: "#333333",
                        borderColor: "#f37a27",
                      }}
                    >
                      <div className="card-body p-4">
                        <button
                        onClick={handleOpenOrderDetailsPopup}
                          className="close-button"
                          title="Close"
                        >
                          &times;
                        </button>
                        <p className="lead fw-bold mb-4" style={{ color: "#f37a27" }}>
                        Order ID : #{orderByOrderId.orderId}
                        </p>
                                {/* Date and Order No */}
                          <div className="row mb-2">
                          <div className="col-md-12">
                            <p className="text-muted mb-4" style={{fontSize : '20px'}}> </p>
                          </div>
                        </div>
                    {/* Grouped Order Information */}
                    <div className="order-info-section">
                      <p className="order-info-title">Details</p>

                      <div className="order-info-item">
                        <span className="order-info-icon">🤵</span>
                        <span className="order-info-label">User Name :</span>
                        <span className="order-info-value order-info-long-text">
                          {orderByOrderId.user.fullName}
                        </span>
                      </div>

                      <div className="order-info-item">
                        <span className="order-info-icon">📅</span>
                        <span className="order-info-label">Order Date:</span>
                        <span className="order-info-value">
                          {new Date(orderByOrderId.paymentDateTime).toLocaleString('vi')}
                        </span>
                      </div>

                      <div className="order-info-item">
                        <span className="order-info-icon">💳</span>
                        <span className="order-info-label">Payment Method:</span>
                        <span className="order-info-value order-info-payment-icon">
                          <img src={orderByOrderId.paymentMethod.imageUrl} alt="Payment Method" />
                        </span>
                      </div>

                      <div className="order-info-item">
                        <span className="order-info-icon">📍</span>
                        <span className="order-info-label">Delivery Address:</span>
                        <span className="order-info-value order-info-long-text">
                          {orderByOrderId.deliveryAddress}
                        </span>
                      </div>
                      

                      {orderByOrderId.coupon && (
                        <div className="order-info-item">
                          <span className="order-info-icon">🎟️</span>
                          <span className="order-info-label">Coupon:</span>
                          <span className="order-info-value">{orderByOrderId.coupon.description} - 
                          {orderByOrderId.coupon.maxDiscountAmount.toLocaleString('vi')}đ</span>
                          
                        </div>
                      )}
                    </div>
                
                        {/* Order details */}
                        <div
                          className="mx-n4 px-4 py-3"
                          style={{ backgroundColor: "#444444" }}
                        >
                        <div 
                            className="row" 
                            >
                             <div className="col-md-4 col-lg-2">
                             <p className="text-white">Image </p>
                            </div>
                            <div className="col-md-8 col-lg-4">
                              <p className="text-white">Product Name</p>
                            </div>
                            <div className="col-md-8 col-lg-2">
                              <p className="text-white">Size</p>
                            </div>
                            <div className="col-md-8 col-lg-2">
                              <p className="text-white">Quantity</p>
                            </div>
                            <div className="col-md-4 col-lg-2">
                              <p className="text-white">Total Price</p>
                            </div>
                          </div>
                          <hr style={{color : 'white'}}></hr>
                      {orderByOrderId.orderDetails.map((item,index) => (
                         <>
                          <div 
                            className="row" 
                            key={index}>
                             <div className="col-md-4 col-lg-2">
                            <img 
                            className="avatar-40" 
                            src={item.foodVariations.food.imageUrl}
                            style={{borderRadius : '10px'}}
                             />
                            </div>
                            <div className="col-md-8 col-lg-4">
                              <p className="text-white">{item.foodVariations.food.foodName}</p>
                            </div>
                            <div className="col-md-8 col-lg-2">
                              <p className="text-white">{item.foodVariations.foodSize.foodSizeName}</p>
                            </div>
                            <div className="col-md-8 col-lg-2">
                              <p  className="text-white">  {item.quantity}</p>
                            </div>
                            <div className="col-md-4 col-lg-2">
                              <p  className="text-white">{item.price.toLocaleString('vi')} đ</p>
                            </div>
                          </div>
                          <hr style={{color : 'white'}}></hr>
                          </>
                      ))}
                        <div className="row">
                              <div className="col-md-7 col-lg-8">
                              </div>
                              <div className="col-md-7 col-lg-2">
                                <p className="mb-0 text-white">ShippFee</p>
                              </div>
                              <div className="col-md-5 col-lg-2">
                                <p className="mb-0 text-white">{orderByOrderId.shipFee.toLocaleString('vi')}đ</p>
                              </div>
                          </div>

                      </div>

                    
                        {/* Total */}
                        <div className="row">
                          {/* Cột chứa nhãn "Total Price" */}
                          <div className="col-md-6 col-lg-9 d-flex justify-content-end ">
                            <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>
                              Total Price:
                            </p>
                          </div>
                          {/* Cột chứa giá trị */}
                          <div className="col-md-6 col-lg-3 d-flex justify-content-start ">
                            <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>
                              {orderByOrderId.totalPrice.toLocaleString('vi')} đ
                            </p>
                          </div>
                        </div>

                        {/* Tracking order */}
                        <p className="lead fw-bold mb-3" style={{ color: "#f37a27" }}>
                          Tracking Order : {orderByOrderId.orderStatus.orderStatusName}
                        </p>
                        {/* <div className="row">
                          <div className="col-lg-12">
                            <div className="horizontal-timeline">
                              <ul className="list-inline items d-flex justify-content-between">
                                <li className="list-inline-item items-list">
                                  <p
                                    className="py-1 px-2 rounded text-white"
                                    style={{ backgroundColor: "#f37a27" }}
                                  >
                                    Ordered
                                  </p>
                                </li>
                                <li className="list-inline-item items-list">
                                  <p
                                    className="py-1 px-2 rounded text-white"
                                    style={{ backgroundColor: "#f37a27" }}
                                  >
                                    Shipped
                                  </p>
                                </li>
                                <li className="list-inline-item items-list">
                                  <p
                                    className="py-1 px-2 rounded text-white"
                                    style={{ backgroundColor: "#f37a27" }}
                                  >
                                    On the way
                                  </p>
                                </li>
                                <li className="list-inline-item items-list">
                                  <p
                                    className="py-1 px-2 rounded text-white"
                                    style={{ backgroundColor: "#f37a27" }}
                                  >
                                    On the way
                                  </p>
                                </li>
                                
                              </ul>
                            </div>
                          </div>
                        </div> */}

                        {/* Help section */}
                        <p className="mt-4 pt-2 mb-0 text-white">
                          Want any help?{" "}
                          <a href="#!" style={{ color: "#f37a27" }}>
                            Please contact us
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsPopup;
