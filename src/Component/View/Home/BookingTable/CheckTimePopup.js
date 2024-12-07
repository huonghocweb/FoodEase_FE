import React from 'react';

const CheckTimePopup = ({isCheckTimePopup , handleCheckTimePopup , reservated , openCheckTimePopup  , tableIdSelected , formStateCheckTime, handleInputChange,resetFormStateCheckTime, 
    handleCheckResTableAvailable , selectedServiceIds , isOpenServicesPopup , handleServicesPopup , errorCheckTimeState}) => {
    return (
        <> 
        {isCheckTimePopup && (
            <div className="service-popup-overlay show">
          <div className="service-popup-content">
            <button className="service-close-button" onClick={openCheckTimePopup}>  &times;   </button>
            <h2 className="service-popup-title">Check Time Table Reservation </h2>
            <div>
            <div className="checktime-form-group-row">
            <div className="checktime-form-group">
                                <label htmlFor="tableIdDisplay">UserName :</label>
                                <input
                                    type="text"
                                    className="checktime-input-table-id"
                                    value={formStateCheckTime.user?.userName}
                                    readOnly
                                />
                            </div>
                            <div className="checktime-form-group">
                                <label htmlFor="tableIdDisplay">Email:</label>
                                <input
                                    type="text"
                                    className="checktime-input-table-id"
                                    value={formStateCheckTime.email}
                                    onChange={e => handleInputChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="checktime-form-group-row">
                            <div className="checktime-form-group">
                                <label htmlFor="datePicker">Select Date:</label>
                                <input
                                    type="date"
                                    value={formStateCheckTime.date}
                                    onChange={e =>handleCheckTimePopup(e.target.value)}
                                    className="checktime-input-date"
                                    required
                                />
                                  {errorCheckTimeState.date && <div>{errorCheckTimeState.date}</div>}
                            </div>
                            <div className="checktime-form-group">
                                <label htmlFor="tableIdDisplay">Table ID:</label>
                                <input
                                    type="text"
                                    onChange={e => handleInputChange('tableId',e.target.value)}
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
                                    value={formStateCheckTime.checkinTime}
                                    onChange={e => handleInputChange('checkinTime', e.target.value)}
                                    className="checktime-input-time"
                                    required
                                />
                                {errorCheckTimeState.checkinTime && <div>{errorCheckTimeState.checkinTime}</div>}
                            </div>
                            <div className="checktime-form-group">
                                <label htmlFor="checkOutTime">Check-out Time:</label>
                                <input
                                    type="time"
                                    value={formStateCheckTime.checkoutTime}
                                    onChange={e => handleInputChange('checkoutTime',e.target.value)}
                                    className="checktime-input-time"
                                    required
                                />
                                  {errorCheckTimeState.checkoutTime && <div>{errorCheckTimeState.checkoutTime}</div>}
                            </div>
                        </div>

                        <div className="services-container">
                                <h3>Selected Services:</h3>
                                <div className="services-list">
                                    {selectedServiceIds && selectedServiceIds.length > 0 ? (
                                        selectedServiceIds.map((service, index) => (
                                            <div key={index} className="service-item">
                                                <div className="service-icon">&#10003;</div>
                                                <div className="service-name">Service {service?.serviceName} + {service.servicePrice?.toLocaleString('vi-Vn')}đ</div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-services">No services selected.
                                        <button type="submit"
                                         className="checktime-btn checktime-btn-primary"
                                          onClick={handleServicesPopup}
                                          >Choose Services 
                                          </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        <div className="reserved-times-container">
                            <h3>Reserved Times Date: {formStateCheckTime.date}</h3>
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
                                    <div 
                                    className="no-reservation"
                                    >Not Find Reserved
                                    </div> 
                                )}
                            </div>
                        </div>
                        <div className="checktime-form-group">
                        <button type="submit" className="checktime-btn checktime-btn-primary" onClick={handleServicesPopup}>Change Services </button>
                            <button type="submit" className="checktime-btn checktime-btn-primary" onClick={handleCheckResTableAvailable}>Book Now</button>
                            <button type="button" className="checktime-btn checktime-btn-secondary" onClick={resetFormStateCheckTime}>Reset</button>
                        </div>
                    </div>
            </div>
        </div> 
        )}
           
        </>
    );
};

export default CheckTimePopup;