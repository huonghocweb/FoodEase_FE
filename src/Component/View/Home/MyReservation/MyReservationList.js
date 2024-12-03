import React from "react";
import { customTranslate } from "../../../../i18n";
import PaginationControls from "../../../Include/Pagination/PaginationControls";
import "./MyReservation.css";

const MyReservationList = ({
  bookingInfo,
  paginationState,
  handlePaginationChange,
  handleCancelRequestReservation,
  sortOptions,
  handleReservationOrderPayment,
}) => {
  return (
    <div className="booking-info-form-container">
      <h1 className="booking-info-form-title">
        {customTranslate("My Booking Information")}
      </h1>
      <PaginationControls
        paginationState={paginationState}
        handlePaginationChange={handlePaginationChange}
        sortOptions={sortOptions}
      />
      <div className="booking-info-form-content">
        {bookingInfo && bookingInfo.length > 0 ? (
          bookingInfo.map((item, index) => (
            <>
              <div className="booking-info-form-details" key={index}>
                <img
                  style={{ width: "160px" , height: "100px" }}
                  className="booking-info-form-image"
                  src={item.resTable.imageUrl}
                  alt={`Table ${item.resTable.tableName}`}
                />

                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Table ID")}:
                  </span>
                  <span className="booking-info-form-value">
                    {item.resTable.tableId}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Booking Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(item.bookTime).toLocaleDateString("vi-Vn")} -{" "}
                    {new Date(item.bookTime).toLocaleTimeString("vi-Vn")}{" "}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in Date")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(item.checkinTime).toLocaleDateString("vi-Vn")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-in Time")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(item.checkinTime).toLocaleTimeString("vi-Vn")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Check-out Time")}:
                  </span>
                  <span className="booking-info-form-value">
                    {new Date(item.checkoutTime).toLocaleTimeString("vi-Vn")}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Services")}:
                  </span>
                  <span className="booking-info-form-value">
                    {item.services.map((service, i) => (
                      <span key={i}>
                        {customTranslate("")}
                        {service.serviceName}
                        {i < item.services.length - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Status")} :
                  </span>
                  <span className="booking-info-form-value">
                    {customTranslate(
                      `${item.reservationStatus.reservationStatusName}`
                    )}
                  </span>
                </div>
                <div className="booking-info-form-item">
                  <span className="booking-info-form-label">
                    {customTranslate("Deposit")} :
                  </span>
                  <span className="booking-info-form-value">
                    {item.totalDeposit?.toLocaleString("vi-Vn")}đ
                  </span>
                </div>

                <div className="booking-info-form-buttons">
                  {
                    item.reservationStatus.reservationStatusId === 1 ? (
                    <button
                      className="booking-info-form-btn delete"
                      onClick={() =>
                        handleCancelRequestReservation(item.reservationId)
                      }
                    >
                      {customTranslate("Cancel")}
                    </button>
                  ) : item.reservationStatus.reservationStatusId === 7 ? (
                    <button
                      className="booking-info-form-btn"
                      onClick={() =>
                        handleReservationOrderPayment(item.reservationId)
                      }
                    >
                      {customTranslate("See Reservation Order")}
                    </button>
                  ) : (
                    <p></p>
                  )
                  }
                </div>
              </div>
            </>
          ))
        ) : (
          <p className="booking-info-form-error">
            {customTranslate("No booking information found")}.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyReservationList;
