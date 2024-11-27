import React, { useState } from "react";
import { customTranslate } from "../../../../i18n";

const CheckinForm = ({
  isOpenCheckinForm,
  handleCloseCheckinForm,
  reservationById,
  handleCheckinReservation,
}) => {
  const [checkinCode, setCheckInCode] = useState("");
  const handleCheckInCode = (e) => {
    setCheckInCode(e.target.value);
  };
  return (
    <>
      {isOpenCheckinForm && (
        <div className="return-request-popup-overlay">
          <div className="return-request-popup">
            <h2>
              {customTranslate(
                "Please Check Information And Enter Checkin Code"
              )}
            </h2>
            <form>
              <div className="form-group">
                <label>{customTranslate("Reservation Id")}:</label>
                <input
                  className="status-input"
                  value={reservationById?.reservationId}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("UserName")}:</label>
                <input
                  className="status-input"
                  value={reservationById?.user?.userName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Checkin Date")}:</label>
                <input
                  className="status-input"
                  value={new Date(
                    reservationById?.checkinTime
                  )?.toLocaleDateString("vi-Vn")}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Checkin Time")}:</label>
                <input
                  className="status-input"
                  value={new Date(
                    reservationById?.checkinTime
                  )?.toLocaleTimeString("vi-Vn")}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Checkout Time")}:</label>
                <input
                  className="status-input"
                  value={new Date(
                    reservationById?.checkoutTime
                  )?.toLocaleTimeString("vi-Vn")}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Status")}:</label>
                <input
                  className="status-input"
                  value={customTranslate(
                    `${reservationById?.reservationStatus?.reservationStatusName}`
                  )}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("CheckIn Code")}:</label>
                <input
                  className="status-input"
                  type="text"
                  onChange={(e) => handleCheckInCode(e)}
                  placeholder={customTranslate("Enter Checkin Code")}
                />
              </div>
              <button
                type="button"
                className="submit-btn"
                onClick={() =>
                  handleCheckinReservation(
                    reservationById?.reservationId,
                    checkinCode
                  )
                }
              >
                {customTranslate("Approve")}
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => handleCloseCheckinForm()}
              >
                {customTranslate("Close")}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckinForm;
