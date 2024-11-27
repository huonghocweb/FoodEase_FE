import React from "react";
import { customTranslate } from "../../../../i18n";
import "./ReturnRequestForm.css";

const OrderReturnFormPopUp = ({
  openOrderReturnForm,
  isOpenReturnForm,
  register,
  handleSubmit,
  handleReturnRequestOrder,
}) => {
  return (
    <>
      {isOpenReturnForm && (
        <div className="return-request-popup-overlay">
          <div className="return-request-popup">
            <form onSubmit={handleSubmit(handleReturnRequestOrder)}>
              <h2>{customTranslate("Please let us know your Reason")}</h2>
              <textarea
                className="comment-box"
                placeholder={customTranslate("Add a Reason...")}
                style={{ width: "100%", height: "120px", fontSize: "20px" }}
                {...register("reason")}
              ></textarea>
              <div className="form-group">
                <label>{customTranslate("Status")}:</label>
                <input
                  className="status-input"
                  value="pending"
                  readOnly
                  {...register("status")}
                />
              </div>
              <button type="submit" className="submit-btn">
                {customTranslate("Submit")}
              </button>
              <button
                className="cancel-btn"
                onClick={(e) => {
                  e.preventDefault();
                  openOrderReturnForm();
                }}
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

export default OrderReturnFormPopUp;
