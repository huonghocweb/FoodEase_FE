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
        <div className="custom-overlay-reservation">
          <div className="custom-popup-reservation">
            <div className="popup-content">
              <div className="booking-info-content">
                <div
                  className="close-icon-reservation"
                  onClick={() => setIsOpenReservationOrderPaymentPopup(false)}
                >
                  <i className="fa-solid fa-xmark fa-lg"></i>
                </div>

                {/* Table Information */}
                <div className="booking-info-details">
                  <label>
                    {customTranslate(
                      `${reservationOrderPayment?.reservationOrder?.reservation?.resTable?.tableName}`
                    )}
                    -{" "}
                    {customTranslate(
                      `${reservationOrderPayment?.reservationOrder?.reservation?.resTable?.capacity}`
                    )}{" "}
                    {customTranslate("Seats")}
                  </label>
                  <img
                    className="table-image"
                    src={
                      reservationOrderPayment?.reservationOrder?.reservation?.resTable?.imageUrl || ""
                    }
                    alt={`Table ${reservationOrderPayment?.reservationOrder?.reservation?.resTable?.tableName || "N/A"}`}
                  />
                </div>

                {/* Booking Details */}
                <div className="booking-info-item">
                  <span className="booking-info-label">{customTranslate("Table ID")}:</span>
                  <span className="booking-info-value">
                    {reservationOrderPayment?.reservationOrder?.reservation?.resTable?.tableId || "N/A"}
                  </span>
                </div>
                <div className="booking-info-item">
                  <span className="booking-info-label">{customTranslate("Booking Date")}:</span>
                  <span className="booking-info-value">
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.bookTime
                    ).toLocaleString("vi-VN")}
                  </span>
                </div>
                <div className="booking-info-item">
                  <span className="booking-info-label">{customTranslate("Check-in Date")}:</span>
                  <span className="booking-info-value">
                    {new Date(
                      reservationOrderPayment?.reservationOrder?.reservation?.checkinTime
                    ).toLocaleDateString("vi-VN") || "N/A"}
                  </span>
                </div>

                {/* Services Ordered */}
                <div className="services-list-reservation">
                  <span className="booking-info-label">{customTranslate("Services")}:</span>
                  {reservationOrderPayment?.reservationOrder?.reservation?.services?.map((service, i) => (
                    <div key={i} className="service-item-reservation">
                      <div className="service-image-reservation">
                        <img src={service?.imageUrl} alt={service?.serviceName} />
                      </div>
                      <div className="service-info-reservation">
                        <div className="service-name-reservation">{customTranslate(service?.serviceName)}</div>
                        <div className="service-quantity-price-reservation">
                          {service?.servicePrice.toLocaleString("vi-VN")}đ * 1 ={" "}
                          {(service?.servicePrice * 1).toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    </div>
                  )) || <span>{customTranslate("No services available.")}</span>}
                </div>

                {/* Products Ordered */}
                <div className="products-ordered-reservation">
                  <span className="booking-info-label">{customTranslate("Products Ordered")}:</span>
                  {reservationOrderPayment?.reservationOrder?.reservationOrderDetails?.map((orderDetails, i) => (
                    <div key={i} className="product-item-reservation">
                      <div className="product-image-reservation">
                        <img src={orderDetails?.foods?.imageUrl} alt={orderDetails?.foods?.foodName} />
                      </div>
                      <div className="product-info-reservation">
                        <div className="product-name-reservation">
                          {customTranslate(orderDetails?.foods?.foodName)}
                        </div>
                        <div className="product-quantity-price-reservation">
                          {orderDetails?.foods?.basePrice.toLocaleString("vi-VN")}đ * {orderDetails?.quantity} ={" "}
                          {(orderDetails?.foods?.basePrice * orderDetails?.quantity).toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    </div>
                  )) || <span>{customTranslate("No products ordered.")}</span>}
                </div>

                {/* Payment Information */}
                <div className="payment-info-reservation">
                  <div className="payment-method-reservation">
                    <span className="payment-info-label-reservation">{customTranslate("Payment Method")}:</span>
                    <img
                      width="70px"
                      src={reservationOrderPayment?.paymentMethod?.imageUrl}
                      alt="Payment method"
                    />
                  </div>
                  <div className="payment-info-item-reservation">
                    <span className="payment-info-label-reservation">{customTranslate("Payment DateTime")}:</span>
                    <span className="payment-info-value-reservation">
                      {new Date(reservationOrderPayment?.paymentDateTime)?.toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>

                {/* Total Price */}
                <div className="total-price-reservation">
                  <span>{customTranslate("Total Quantity")}</span>
                  <span>
                    {reservationOrderPayment?.reservationOrder?.totalQuantity}{" "}
                    {customTranslate("Item(s)")}
                  </span>
                </div>
                <div className="total-price-reservation">
                  <span>{customTranslate("Deposit")}</span>
                  <span>
                    {reservationOrderPayment?.reservationOrder?.reservation?.totalDeposit?.toLocaleString("vi-VN") || "N/A"} đ
                  </span>
                </div>
                <div className="total-price-reservation">
                  <span>{customTranslate("Total Price")}</span>
                  <span>
                    {reservationOrderPayment?.totalAmount?.toLocaleString("vi-VN") || "N/A"} đ
                  </span>
                </div>

                {/* Reservation Status */}
                <div className="total-price-reservation">
                  <span>{customTranslate("Status")}</span>
                  <span>
                    {customTranslate(reservationOrderPayment?.reservationOrder?.reservation?.reservationStatus?.reservationStatusName || "N/A")}
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
