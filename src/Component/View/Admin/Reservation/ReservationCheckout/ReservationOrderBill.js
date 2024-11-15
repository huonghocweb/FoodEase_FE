import React, { useState } from 'react';
import './ReservationOrderBill.css';

const ReservationOrderBill = ({ isOpentCheckoutPopup , handleOpenCheckoutPopup ,paymentMethod , reservationOrder, handleCheckoutReservationOrder }) => {
    const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);
    const [isConfirmOrder, setIsConfirmOrder] = useState(false);
    const subtotal = reservationOrder?.totalServicePrice + reservationOrder?.totalPrice;
    const totalDeposit = reservationOrder?.reservation?.totalDeposit;
    const totalAmount = (subtotal - totalDeposit) + (subtotal - totalDeposit)/10 ;
    // Hàm xử lý khi người dùng bấm nút "Confirm"
    const handleConfirmOrder = () => {
        setIsConfirmOrder(true);  // Chuyển sang giao diện chọn phương thức thanh toán
        setIsPaymentMethodOpen(true); // Mở phần thanh toán
    };

    // Hàm quay lại phần xác nhận hóa đơn
    const handleBackToOrder = () => {
        setIsConfirmOrder(false);
        setIsPaymentMethodOpen(false); // Quay lại phần xác nhận hóa đơn
    };

    return (
        <>
            {/* Phần xác nhận hóa đơn */}
            {isOpentCheckoutPopup && !isPaymentMethodOpen && (
                <div className="reservation-overlay">
                    <div className="reservation-popup">
                        <div className="reservation-header">
                            <h2 className="reservation-title">Order Confirmation</h2>
                            <div className="reservation-user-info">
                                <p><strong>FullName:</strong>{reservationOrder.reservation.user.fullName}</p>
                                <p><strong>Table:</strong> #{reservationOrder.reservation.resTable.tableId}</p>
                            </div>
                            <div className="reservation-user-info">
                                <p><strong>Phone:</strong> {reservationOrder.reservation.user.phoneNumber}</p>
                                <p><strong>Reservation Time:</strong> 
                                 {new Date (reservationOrder.orderDateTime).toLocaleTimeString('vi-Vn')} -  
                                {new Date (reservationOrder.orderDateTime).toLocaleDateString('vi-Vn')}
                                </p>
                            </div>
                        </div>

                        {/* Danh sách món ăn */}
                        <div className="reservation-section">
                            <h2 className="reservation-title">Food Ordered</h2>
                            <div className="reservation-item-list">
                            {reservationOrder.reservationOrderDetails.map((item,index) => (
                                <div
                                key={index}
                                 className="reservation-item">
                                    <span className="item-name">{item.foods.foodName}</span>
                                    <span>
                                        <img 
                                        src={item.foods.imageUrl}
                                            width={'55px'}
                                        />
                                    </span>
                                    <span className="item-quantity">Qty: {item.quantity}</span>
                                    <span className="item-price">{item.foods.basePrice.toLocaleString('vi-Vn')}đ</span>
                                </div>
                            ))}
                            </div>
                        </div>

                        {/* Danh sách dịch vụ */}
                      

                        <div className="reservation-section">
                            <h2 className="reservation-title">Services Requested</h2>
                            <div className="reservation-service-list">
                                {reservationOrder.reservation.services && reservationOrder.reservation.services.length > 0 ? (
                            reservationOrder.reservation.services.map((item,index) => (
                                <div 
                                key={index}
                                className="reservation-service">
                                <span className="service-name">{item.serviceName}</span>
                                <span>
                                <img 
                                    src={item.imageUrl}
                                    width={'55px'}
                                    style={{marginRight : '95px'}}
                                />
                                </span>
                                <span className="service-price">{item.servicePrice.toLocaleString('vi-Vn')}đ</span>
                                </div>
                            ))
                            ) : (
                                <div>No services available</div>
                            )}
                            </div>
                        </div>

                        {/* Tổng hợp hóa đơn */}
                        <div className="reservation-summary">
                            <div className="summary-row">
                                <span className="summary-label">Subtotal:</span>
                                <span className="summary-value">{subtotal.toLocaleString('vi-Vn')}đ</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Deposit:</span>
                                <span className="summary-value">- {totalDeposit.toLocaleString('vi-Vn')}đ</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Tax (10%):</span>
                                <span className="summary-value">+ {((subtotal - totalDeposit ) /10).toLocaleString('vi-Vn')}đ</span>
                            </div>
                            <div className="summary-row total-row">
                                <span className="summary-label">Total:</span>
                                <span className="summary-value">{totalAmount.toLocaleString('vi-Vn')}đ</span>
                            </div>
                        </div>

                        {/* Nút xác nhận và hủy */}
                        <div className="reservation-button-group">
                            <button className="reservation-confirm-btn" onClick={handleConfirmOrder}>Confirm</button>
                            <button
                             className="reservation-cancel-btn"
                             onClick={handleOpenCheckoutPopup}
                            >Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Phần chọn phương thức thanh toán */}
            {isPaymentMethodOpen && (
                <div className="payment-overlay">
                    <div className="payment-popup">
                    <label  className="pay">Payment Method</label>
                        <div className="radio-group">
                        {
                            paymentMethod.map((item,index) => (
                            <div 
                            key={index}
                            className='radio'
                                onClick={() => handleCheckoutReservationOrder(item.paymentId, totalAmount)}  >
                            <img src={item.imageUrl} width="200px" height="70px"/>
                            </div>
                            ))
                        }
                            <br/>
                        </div> 

                        {/* Nút quay lại */}
                        <button className="payment-back-btn" onClick={handleBackToOrder}>Back</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ReservationOrderBill;
