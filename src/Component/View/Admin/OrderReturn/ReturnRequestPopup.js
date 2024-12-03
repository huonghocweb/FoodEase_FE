import React from "react";
import { customTranslate } from "../../../../i18n";

const ReturnRequestPopup = ({
  isOpenReturnOrder,
  handleOpentOrderReturnRequest,
  orderReturnByOrderId,
  hanldeApproveOrderReturn,
}) => {
  const orderReturn =
    orderReturnByOrderId && orderReturnByOrderId.length > 0
      ? orderReturnByOrderId[0]
      : null;
  if (!orderReturn) {
      return null; // Return null if no data is available
  }

  return (
    <>
      {isOpenReturnOrder && (
        <div className="return-request-popup-overlay">
          <div className="return-request-popup">
            <h2>{customTranslate("Please enter Reason for Return Request")}</h2>
            <form>
              <div className="form-group">
                <label>{customTranslate("OrderId")}:</label>
                <input
                  className="status-input"
                  value={orderReturn.order?.orderId || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("UserName")}:</label>
                <input
                  className="status-input"
                  value={orderReturn.order?.user?.userName || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Reason")}:</label>
                <input
                  className="status-input"
                  value={orderReturn.reason || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Status")}:</label>
                <input
                  className="status-input"
                  value={orderReturn.status || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>{customTranslate("Return Date")}:</label>
                <input
                  className="status-input"
                  value={orderReturn.returnDateTime || ""}
                  readOnly
                />
              </div>
              <button
                type="button"
                className="submit-btn"
                onClick={() =>
                  hanldeApproveOrderReturn(orderReturn.order.orderId, true)
                }
              >
                {customTranslate("Approve")}
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() =>
                  hanldeApproveOrderReturn(orderReturn.order.orderId, false)
                }
              >
                {customTranslate("Cancel")}
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => handleOpentOrderReturnRequest()}
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

export default ReturnRequestPopup;
