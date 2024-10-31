import React from 'react';
import './MyReservation.css';
import PaginationControls from '../../../Include/Pagination/PaginationControls';

const MyReservationList = ({ bookingInfo , paginationState , handlePaginationChange , handleCancelRequestReservation,sortOptions}) => {
    return (
        <div className="booking-info-form-container">
            <h1 className="booking-info-form-title">My Booking Information</h1>
            <PaginationControls
            paginationState = {paginationState}
            handlePaginationChange = {handlePaginationChange} 
            sortOptions = {sortOptions}
             />
            <div className="booking-info-form-content">
                {bookingInfo && bookingInfo.length > 0 ? (
                    bookingInfo.map((item, index) => (
                    <>
                        <div className="booking-info-form-details" key={index}>
                            <img
                                style={{width : '160px'}}
                                className="booking-info-form-image"
                                src={item.resTable.imageUrl} 
                                alt={`Table ${item.resTable.tableName}`}
                            />
                            
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Table ID:</span>
                                <span className="booking-info-form-value">{item.resTable.tableId}</span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Booking Date:</span>
                                <span className="booking-info-form-value">{item.date}</span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Check-in Time:</span>
                                <span className="booking-info-form-value">{item.checkinTime}</span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Check-out Time:</span>
                                <span className="booking-info-form-value">{item.checkoutTime}</span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Services:</span>
                                <span className="booking-info-form-value">
                                    {item.services.map((service, i) => (
                                        <span key={i}>
                                            {service.serviceName}
                                            {i < item.services.length - 1 && ', '}
                                        </span>
                                    ))}
                                </span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Status :</span>
                                <span className="booking-info-form-value">{item.reservationStatus.reservationStatusName}</span>
                            </div>
                            <div className="booking-info-form-item">
                                <span className="booking-info-form-label">Deposit :</span>
                                <span className="booking-info-form-value">{item.totalDeposit?.toLocaleString('vi-Vn')}đ</span>
                            </div>

                            <div className="booking-info-form-buttons">
                                <button className="booking-info-form-btn">Update</button>
                                {item.reservationStatus.reservationStatusId === 1  && (
                                    <button 
                                    className="booking-info-form-btn delete"
                                     onClick={()=>handleCancelRequestReservation(item.reservationId)}
                                     >Cancel</button>
                                )}
                                    
                            </div>
                            
                        </div>

                        </>
                        
                    ))
                ) : (
                    <p className="booking-info-form-error">No booking information found.</p>
                )}
            </div>
        </div>
    );
};

export default MyReservationList;
