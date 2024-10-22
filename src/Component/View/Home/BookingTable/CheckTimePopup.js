import React from 'react';

const CheckTimePopup = ({isCheckTimePopup , handleCheckTimePopup , reservated , openCheckTimePopup  , tableIdSelected, dateCheckTime}) => {
    return (
        <> 
        {isCheckTimePopup && (
            <div className="service-popup-overlay show">
          <div className="service-popup-content">
            <button className="service-close-button" onClick={handleCheckTimePopup}>  &times;   </button>
            <h2 className="service-popup-title">Check Time Table Reservation </h2>
            <div>
                        <div className="checktime-form-group-row">
                            <div className="checktime-form-group">
                                <label htmlFor="datePicker">Select Date:</label>
                                <input
                                    type="date"
                                    onChange={e =>handleCheckTimePopup(e.target.value)}
                                    className="checktime-input-date"
                                    required
                                />
                            </div>
                            <div className="checktime-form-group">
                                <label htmlFor="tableIdDisplay">Table ID:</label>
                                <input
                                    type="text"
                                    id="tableIdDisplay"
                                    className="checktime-input-table-id"
                                    value={tableIdSelected}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="checktime-form-group-row">
                            <div className="checktime-form-group">
                                <label htmlFor="checkInTime">Check-in Time:</label>
                                <input
                                    type="time"
                                    id="checkInTime"
                                    className="checktime-input-time"
                                    required
                                />
                            </div>
                            <div className="checktime-form-group">
                                <label htmlFor="checkOutTime">Check-out Time:</label>
                                <input
                                    type="time"
                                    id="checkOutTime"
                                    className="checktime-input-time"
                                    required
                                />
                            </div>
                        </div>
                        <div className="reserved-times-container">
                            <h3>Reserved Times Date: {dateCheckTime}</h3>
                            <div className="reserved-times-row">
                                {reservated.length > 0 ? (
                                    reservated.map((item, index) => (
                                        <div key={index} className="reserved-time-pair"> 
                                            <div className="reserved-time-card">
                                                Check-in: {item.checkinTime.toString().split('T')[1].substring(0, 5)}
                                            </div>
                                            <div className="reserved-time-card">
                                                Check-out: {item.checkoutTime.toString().split('T')[1].substring(0, 5)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-reservation">Not Find Reserved</div> 
                                )}
                            </div>
                        </div>
                        <div className="checktime-form-group">
                            <button type="submit" className="checktime-btn checktime-btn-primary" onClick={handleCheckTimePopup}>Check Availability</button>
                            <button type="button" className="checktime-btn checktime-btn-secondary" onClick={openCheckTimePopup}>Cancel</button>
                        </div>
                    </div>
            </div>
        </div> 
        )}
           
        </>
    );
};

export default CheckTimePopup;