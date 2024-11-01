import React, { useState } from 'react';

const CheckinForm = ({isOpenCheckinForm,handleCloseCheckinForm,reservationById , handleCheckinReservation}) => {
 const [checkinCode,setCheckInCode] = useState('');
 const handleCheckInCode = (e) =>{
    setCheckInCode(e.target.value);
 }
    return (
        <>
            {isOpenCheckinForm && (
                <div className="return-request-popup-overlay">
                    <div className="return-request-popup">
                        <h2>Please Check Information And Enter Checkin Code</h2>
                        <form>
                            <div className="form-group">
                                <label>ReservaitonId:</label>
                                <input
                                    className="status-input"
                                    value={reservationById?.reservationId}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>User Name:</label>
                                <input
                                    className="status-input"
                                    value={reservationById?.user?.userName }
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Checkin Date:</label>
                                <input
                                    className="status-input"
                                    value={new Date(reservationById?.checkinTime)?.toLocaleDateString('vi-Vn')}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Checkin Time:</label>
                                <input
                                    className="status-input"
                                    value={new Date(reservationById?.checkinTime)?.toLocaleTimeString('vi-Vn')}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Checkout Time:</label>
                                <input
                                    className="status-input"
                                    value={new Date(reservationById?.checkoutTime)?.toLocaleTimeString('vi-Vn')}
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>Status:</label>
                                <input
                                    className="status-input"
                                    value={reservationById?.reservationStatus?.reservationStatusName }
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label>CheckIn Code:</label>
                                <input
                                    className="status-input"
                                    type='text'
                                    onChange={(e) => handleCheckInCode(e)}
                                    placeholder='Check in Code ...'
                                />
                            </div>
                            <button
                                type="button"
                                className="submit-btn"
                                onClick={() => handleCheckinReservation(reservationById?.reservationId, checkinCode)}
                            >
                                Approve
                            </button>
                            <button
                                type="button"
                                className="close-btn"
                                onClick={() => handleCloseCheckinForm()}
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

export default CheckinForm;