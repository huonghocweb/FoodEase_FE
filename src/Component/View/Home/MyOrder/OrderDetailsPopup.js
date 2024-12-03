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
                          Purchase Receipt
                        </p>

                        {/* Date and Order No */}
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <p className="small text-muted mb-1">Date</p>
                            <p className="text-white">
                            {new Date(orderByOrderId.paymentDateTime).toLocaleTimeString('vi')} -
                            {new Date(orderByOrderId.paymentDateTime).toLocaleDateString('vi')} 
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p className="small text-muted mb-1">Order No.</p>
                            <p className="text-white">#{orderByOrderId.orderId}</p>
                          </div>
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
                              <p className="text-white">Price</p>
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
                            className="avatar-50" 
                            src={item.foodVariations.food.imageUrl}
                             />
                            </div>
                            <div className="col-md-8 col-lg-4">
                              <p className="text-white">{item.foodVariations.food.foodName}</p>
                            </div>
                            <div className="col-md-8 col-lg-2">
                              <p className="text-white">{item.foodVariations.food.basePrice.toLocaleString('vi')} đ</p>
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
                            <div className="col-md-8 col-lg-9">
                              <p className="mb-0 text-white">Shipping</p>
                            </div>
                            <div className="col-md-4 col-lg-3">
                              <p className="mb-0 text-white">£33.00</p>
                            </div>
                            <div className="col-md-8 col-lg-9">
                              <p className="mb-0 text-white">Shipping</p>
                            </div>
                            <div className="col-md-4 col-lg-3">
                              <p className="mb-0 text-white">£33.00</p>
                            </div>
                          </div>
                      </div>
                        {/* Total */}
                        <div className="row my-3">
                          <div className="col-md-4 offset-md-8 col-lg-3 offset-lg-9">
                            <p className="lead fw-bold mb-0" style={{ color: "#f37a27" }}>
                              {orderByOrderId.totalPrice.toLocaleString('vi')} đ
                            </p>
                          </div>
                        </div>

                        {/* Tracking order */}
                        <p className="lead fw-bold mb-3" style={{ color: "#f37a27" }}>
                          Tracking Order
                        </p>
                        <div className="row">
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
                        </div>

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
