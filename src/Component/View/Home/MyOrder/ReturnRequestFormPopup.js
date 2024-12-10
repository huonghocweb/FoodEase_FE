import React from "react";
import { customTranslate } from "../../../../i18n";
import "./ReturnRequestForm.css";

const OrderReturnFormPopUp = ({
  openOrderReturnForm,
  isOpenReturnForm,
  register,
  handleSubmit,
  handleReturnRequestOrder,
  orderByOrderId
}) => {
  return (
    <>
      {isOpenReturnForm && (
        <div className="return-request-popup-overlay">
          <div className="return-request-popup">
            <form onSubmit={handleSubmit(handleReturnRequestOrder)}>
            <h2>{customTranslate("Please let us know your Reason")}</h2>
              <div className="form-group">
                <label>{customTranslate("Order ID")}:</label>
                <input
                  className="status-input"
                  value={orderByOrderId.orderId}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("User Name")}:</label>
                <input
                  className="status-input"
                  value={orderByOrderId.user.userName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Payment DateTime ")}:</label>
                <input
                  className="status-input"
                  value={orderByOrderId.orderDate}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Status")}:</label>
                <input
                  className="status-input"
                  value="pending"
                  readOnly
                  {...register("status")}
                />
              </div>
          
              <textarea
                className="comment-box"
                placeholder={customTranslate("Add a Reason...")}
                style={{ width: "100%", height: "120px", fontSize: "20px" }}
                {...register("reason")}
              ></textarea>
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
