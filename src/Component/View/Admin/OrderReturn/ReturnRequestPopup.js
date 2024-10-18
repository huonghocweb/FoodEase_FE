import React from 'react';

const ReturnRequestPopup = ({ isOpenReturnOrder, checkOrderReturnRequest, orderReturnByOrderId, hanldeApproveOrderReturn }) => {
    const orderReturn = orderReturnByOrderId && orderReturnByOrderId.length > 0 ? orderReturnByOrderId[0] : null;
    
    if (!orderReturn) {
        console.log('No order return data available');
        return null; // Return null if no data is available
    }

    return (
        <>
            {isOpenReturnOrder && (
                <div className="return-request-popup-overlay">
                    <div className="return-request-popup">
                        <h2>Please Reason Request OF Order</h2>
                        <form>
                            <div className="form-group">
                                <label>OrderId:</label>
                                <input
                                    className="status-input"
                                    value={orderReturn.order?.orderId || ""}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>User Name:</label>
                                <input
                                    className="status-input"
                                    value={orderReturn.order?.user?.userName || ""}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Reason:</label>
                                <input
                                    className="status-input"
                                    value={orderReturn.reason || ""}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <input
                                    className="status-input"
                                    value={orderReturn.status || ""}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Return Date:</label>
                                <input
                                    className="status-input"
                                    value={orderReturn.returnDateTime || ""}
                                    readOnly
                                />
                            </div>
                            <button
                                type="button"
                                className="submit-btn"
                                onClick={() => hanldeApproveOrderReturn(orderReturn.order.orderId, true)}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => hanldeApproveOrderReturn(orderReturn.order.orderId, false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="close-btn"
                                onClick={() => checkOrderReturnRequest(null)}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReturnRequestPopup;
