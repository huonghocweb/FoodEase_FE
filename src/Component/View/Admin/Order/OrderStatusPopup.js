import React, { useState } from 'react';
import './OrderStatusPopup.css';

const OrderStatusPopup = ({isOpenOrderStatus , orderById  , handleChangeOrderStatus  , setIsOpenOrderStatus}) => {

    const [isShipping, setIsShipping] = useState(false);

    const toggleStatus = () => {
        setIsShipping(!isShipping);
        handleChangeOrderStatus(orderById?.orderId);
    };

   if(!orderById){
    return (
        <p>Loading....</p>
    )
   }
  return (
    <>
      {isOpenOrderStatus && (
        <div className="return-request-popup-overlay">
          <div className="return-request-popup">
            <h2>Order Status</h2>
            <form>
              <div className="form-group">
                <label>OrderId:</label>
                <input
                  className="status-input"
                  value={orderById.orderId || ""}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>UserName:</label>
                <input
                  className="status-input"
                  value={orderById?.user?.userName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Status :</label>
                <input
                  className="status-input"
                  value={orderById.orderStatus.orderStatusName}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Total Quantity :</label>
                <input
                  className="status-input"
                  value={`${orderById.totalQuantity} Item`}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Payment Status :</label>
                <input
                  className="status-input"
                  value={ `${orderById.totalPrice.toLocaleString('vi')} đ -  ${orderById.paymentMethod.paymentName}`}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Order Time :</label>
                <input
                    className="status-input"
                    value={(() => {
                    const now = new Date();
                    const paymentDate = new Date(orderById.paymentDateTime);
                    const diff = now - paymentDate;
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    return `${hours} hours, ${minutes} minutes ago`;
                    })()}
                    readOnly
                />
                </div>
                <div className="order-status-container">
            <i className={`fa-solid fa-utensils fa-2xl ${isShipping ? 'hidden' : 'visible'}`} style={{color:' #74C0FC'}}></i>
            <div
                className={`order-status-toggle ${isShipping ? 'active' : ''}`}
                onClick={toggleStatus}
            >
                <div className="toggle-handle"></div>
            </div>

            <i className={`fa-solid fa-truck-fast  fa-2xl ${!isShipping ? 'hidden' : 'visible'}`}  style={{color:' #74C0FC'}}></i>
        </div>

                <button
                type="button"
                className="close-btn"
                onClick={() => setIsOpenOrderStatus(null)} >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderStatusPopup;