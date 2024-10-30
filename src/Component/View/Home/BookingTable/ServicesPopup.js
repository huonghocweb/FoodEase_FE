import React from 'react';
import './Services.css';

const ServicesPopup = ({ isOpenServicesPopup, handleServicesPopup, tableServices, serPageCurrent ,serTotalPages , handleSerPageCurrent , 
  selectedServiceIds,handleSelectServices }) => {
  return (
    <>
      {isOpenServicesPopup && (
        <div className="service-popup-overlay show">
          <div className="service-popup-content">
            <button className="service-close-button" onClick={handleServicesPopup}>
              &times;
            </button>
            <h2 className="service-popup-title">Table Services</h2>
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
            <div className="service-table-list">
              {tableServices.map((item,index) => (
                <div key={index} className="service-table-item">
                <input
                    type="checkbox"
                    id={`service-${item.serviceId}`}
                    checked={selectedServiceIds.includes(item)}
                    onChange={() => handleSelectServices(item)}
                    className="service-checkbox"
                  />
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="service-table-image"
                  />
                  <div className="service-table-info">
                    <h3 className="service-table-title">{item.serviceName}</h3>
                    <p className="service-table-detail"> {item.description}</p>
                    <p className="service-table-detail">Fee : <span>{item.servicePrice?.toLocaleString('vi-VN')}đ</span></p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleServicesPopup}>Choose Service</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ServicesPopup;
