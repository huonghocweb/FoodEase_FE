import React from "react";
import { customTranslate } from "../../../../i18n";

const ReservationOrderPaymentDetailsPopup = ({
  isOpenReservationOrderDetailsPopup,
  setIsOpenReservationOrderDetailsPopup,
  reservationOrderPaymentById,
}) => {
  return (
    <>
      {isOpenReservationOrderDetailsPopup && (
        <div className="custom-overlay-reservation">
          <div className="custom-popup-reservation">
            <div
              className="booking-info-form-content"
              style={{ display: "flex" }}
            >
              <div className="booking-info-form-details">
                <div
                  className="close-icon"
                  onClick={() => setIsOpenReservationOrderDetailsPopup(false)}
                >
                  <i className="fa-solid fa-xmark fa-lg"></i>
                </div>
                <label>
                  {customTranslate(
                    `${reservationOrderPaymentById?.reservationOrder?.reservation?.resTable?.tableName}`
                  )}
                  -{" "}
                  {
                    reservationOrderPaymentById?.reservationOrder?.reservation
                      ?.resTable?.capacity
                  }{" "}
                  {customTranslate("Seats")}
                </label>
                <img
                  style={{ width: "220px" }}
                  className="booking-info-form-image"
                  src={
                    reservationOrderPaymentById?.reservationOrder?.reservation
                      ?.resTable?.imageUrl || ""
                  }
                  alt={`Table ${
                    reservationOrderPaymentById?.reservationOrder?.reservation
                      ?.resTable?.tableName || "N/A"
                  }`}
                />
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Table ID")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.reservationOrder?.reservation
                      ?.resTable?.tableId || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("User")} :
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.reservationOrder?.reservation
                      ?.user?.fullName || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Booking Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPaymentById?.reservationOrder?.reservation?.bookTime
                    ).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPaymentById?.reservationOrder?.reservation?.checkinTime
                    ).toLocaleDateString("vi-VN") || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in and Check-out Time")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPaymentById?.reservationOrder?.reservation?.checkinTime
                    ).toLocaleTimeString("vi-VN")}{" "}
                    -
                    {new Date(
                      reservationOrderPaymentById?.reservationOrder?.reservation?.checkoutTime
                    ).toLocaleTimeString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Services")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.reservationOrder?.reservation?.services?.map(
                      (service, i) => (
                        <div key={i} className="service-item">
                        <div className="service-details">
                            <div className="service-image">
                              <img
                                src={service?.imageUrl}
                                alt={service?.serviceName}
                                style={{borderRadius : '15px' , width : '80px'}}
                              />
                            </div>
                          </div>
                          <div className="service-name">
                            {customTranslate(`${service?.serviceName}`)}
                          </div>
                        
                          <div className="service-quantity-price">
                            {service?.servicePrice.toLocaleString("vi-VN")}đ
                            * 1 =
                            {(service?.servicePrice * 1).toLocaleString(
                              "vi-VN"
                            )}
                            đ
                          </div>
                        </div>
                      )
                    ) || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Foods Ordered")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.reservationOrder?.reservationOrderDetails?.map(
                      (orderDetails, i) => (
                        <div key={i} className="service-item">
                        <div className="service-details">
                            <div className="service-image">
                              <img
                                src={orderDetails?.foods?.imageUrl}
                                alt={orderDetails?.foods?.foodName}
                                style={{borderRadius : '15px' , width : '80px'}}
                              />
                            </div>
                          </div>
                          <div className="service-name">
                            {customTranslate(
                              `${orderDetails?.foods?.foodName}`
                            )}
                          </div>
                        
                          <div className="service-quantity-price">
                            {orderDetails?.foods?.basePrice.toLocaleString(
                              "vi-VN"
                            )}
                            đ * {orderDetails?.quantity} ={" "}
                            {(
                              orderDetails?.foods?.basePrice *
                              orderDetails?.quantity
                            ).toLocaleString("vi-VN")}
                            đ
                          </div>
                        </div>
                      )
                    ) || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Payment Method")} :
                  </span>
                  <span className="booking-info-form-value">
                    <img
                      width={"70px"}
                      src={reservationOrderPaymentById?.paymentMethod?.imageUrl}
                    />
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Payment DateTime")} :
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPaymentById?.paymentDateTime
                    )?.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Total Quantity")}:
                  </span>
                  <span className="booking-info-form-value">
                    {
                      reservationOrderPaymentById?.reservationOrder
                        ?.totalQuantity
                    }{" "}
                    {customTranslate("Item")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Deposit")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.reservationOrder?.reservation?.totalDeposit?.toLocaleString(
                      "vi-VN"
                    ) || "N/A"}
                    đ
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Total Price")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPaymentById?.totalAmount?.toLocaleString(
                      "vi-VN"
                    ) || "N/A"}
                    đ
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Status")}:
                  </span>
                  <span className="booking-info-form-value">
                    {customTranslate(
                      `${
                        reservationOrderPaymentById?.reservationOrder
                          ?.reservation?.reservationStatus
                          ?.reservationStatusName || "N/A"
                      }`
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationOrderPaymentDetailsPopup;
