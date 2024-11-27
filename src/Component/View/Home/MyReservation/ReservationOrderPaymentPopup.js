import React, { useState } from "react";
import { customTranslate } from "../../../../i18n";
import "./ReservationOrderPaymentPopup.css";

const ReservationOrderPaymentPopup = ({
  isOpenReservationOrderPaymentPopup,
  reservationOrderPayment,
  setIsOpenReservationOrderPaymentPopup,
}) => {
  const [showServiceDetails, setShowServiceDetails] = useState(null);
  const toggleServiceDetails = (index) => {
    setShowServiceDetails(showServiceDetails === index ? null : index);
  };
  return (
    <>
      {isOpenReservationOrderPaymentPopup && (
        <div className="overlay">
          <div className="popup">
            <div
              className="booking-info-form-content"
              style={{ display: "flex" }}
            >
              <div className="booking-info-form-details">
                <div
                  className="close-icon"
                  onClick={() => setIsOpenReservationOrderPaymentPopup(false)}
                >
                  <i class="fa-solid fa-xmark fa-lg"></i>
                </div>
                <label>
                  {customTranslate(
                    `${reservationOrderPayment?.reservationOrder?.reservation?.resTable?.tableName}`
                  )}
                  -{" "}
                  {customTranslate(`${reservationOrderPayment?.reservationOrder?.reservation?.resTable?.capacity}
                  `)}{" "}
                  {customTranslate("Seats")}
                </label>
                <img
                  style={{ width: "160px" }}
                  className="booking-info-form-image"
                  src={
                    reservationOrderPayment?.reservationOrder?.reservation
                      ?.resTable?.imageUrl || ""
                  }
                  alt={`Table ${
                    reservationOrderPayment?.reservationOrder?.reservation
                      ?.resTable?.tableName || "N/A"
                  }`}
                />
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Table ID")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPayment?.reservationOrder?.reservation
                      ?.resTable?.tableId || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Booking Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.bookTime
                    ).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.checkinTime
                    ).toLocaleDateString("vi-VN") || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in and Check-out Time")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.checkinTime
                    ).toLocaleTimeString("vi-VN")}{" "}
                    -{" "}
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.checkoutTime
                    ).toLocaleTimeString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Services")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPayment?.reservationOrder?.reservation?.services?.map(
                      (service, i) => (
                        <div
                          key={i}
                          className="service-item"
                          onClick={() => toggleServiceDetails(i)}
                        >
                          <div className="service-name">
                            {customTranslate(`${service?.serviceName}`)}
                          </div>
                          {showServiceDetails === i && (
                            <>
                              <div className="service-details">
                                <div className="service-image">
                                  <img
                                    src={service?.imageUrl}
                                    alt={service?.serviceName}
                                  />
                                </div>
                              </div>
                              <div className="service-quantity-price">
                                {service?.servicePrice.toLocaleString("vi-VN")}đ
                                * 1 =
                                {(service?.servicePrice * 1).toLocaleString(
                                  "vi-VN"
                                )}
                                đ
                              </div>
                            </>
                          )}
                        </div>
                      )
                    ) || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Products Ordered")} :
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPayment?.reservationOrder?.reservationOrderDetails?.map(
                      (orderDetails, i) => (
                        <div
                          key={i}
                          onClick={() => toggleServiceDetails(i)}
                          className="service-item"
                        >
                          <div className="service-name">
                            {customTranslate(
                              `${orderDetails?.foods?.foodName}`
                            )}
                          </div>
                          {showServiceDetails === i && (
                            <>
                              <div className="service-details">
                                <div className="service-image">
                                  <img
                                    src={orderDetails?.foods?.imageUrl}
                                    alt={orderDetails?.foods?.foodName}
                                  />
                                </div>
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
                            </>
                          )}
                        </div>
                      )
                    ) || "N/A"}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Payment Method")}:
                  </span>
                  <span className="booking-info-form-value">
                    {/* {reservationOrderPayment?.paymentMethod?.paymentName} */}
                    <img
                      width={"70px"}
                      src={reservationOrderPayment?.paymentMethod?.imageUrl}
                    />
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Payment DateTime")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(
                      reservationOrderPayment?.paymentDateTime
                    )?.toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Total Quantity")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPayment?.reservationOrder?.totalQuantity}{" "}
                    {customTranslate("Item")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Deposit")}:
                  </span>
                  <span className="booking-info-form-value">
                    {reservationOrderPayment?.reservationOrder?.reservation?.totalDeposit?.toLocaleString(
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
                    {reservationOrderPayment?.totalAmount?.toLocaleString(
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
                        reservationOrderPayment?.reservationOrder?.reservation
                          ?.reservationStatus?.reservationStatusName || "N/A"
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

export default ReservationOrderPaymentPopup;
