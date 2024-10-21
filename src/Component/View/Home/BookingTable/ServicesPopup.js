import React, { useState } from 'react';

const ServicesPopup = ({ isOpenServicesPopup, handleServicesPopup, tableServices, serPageCurrent ,serTotalPages , handleSerPageCurrent , 
  selectedServiceIds,handleSelectServices }) => {
    console.log(selectedServiceIds);
  return (
    <>
      {isOpenServicesPopup && (
        <div className="reservation-popup-overlay show">
          <div className="reservation-popup-content">
            <button className="reservation-close-button" onClick={handleServicesPopup}>
              &times;
            </button>
            <h2 className="reservation-popup-title">Table Services</h2>
            <div className="pagination">
              <button 
                onClick={() => handleSerPageCurrent(serPageCurrent - 1)} 
                disabled={serPageCurrent === 0}
              >
                Prev
              </button>
              <span>Page {serPageCurrent + 1} / {serTotalPages}</span>
              <button 
                onClick={() => handleSerPageCurrent(serPageCurrent + 1)} 
                 disabled={serPageCurrent === serTotalPages -1 }
              >
                Next
              </button>
            </div>
            <div className="reservation-table-list">
              {tableServices.map((item,index) => (
                <div key={index} className="reservation-table-item">
                <input
                    type="checkbox"
                    id={`service-${item.serviceId}`}
                    checked={selectedServiceIds.includes(item.serviceId)}
                    onChange={() => handleSelectServices(item.serviceId)}
                    className="service-checkbox"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="reservation-table-image"
                  />
                  <div className="reservation-table-info">
                    <h3 className="reservation-table-title">{item.serviceName}</h3>
                    <p className="reservation-table-detail"> {item.description}</p>
                    <p className="reservation-table-detail">Fee : <span>{item.servicePrice?.toLocaleString('vi-VN')}đ</span></p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleServicesPopup} >Choose Service</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesPopup;
