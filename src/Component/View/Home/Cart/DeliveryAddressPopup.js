import React from 'react';
import { customTranslate } from "../../../../i18n";
import './DeliveryAddress.css';

const DeliveryAddressPopup = ({ isOpenDelivery, handleDeliveryAddress, provinceData, handleChooseDistrictByProvinceId, 
    districtData, handleChooseWardByDistrictId, wardData, services , handleChooseShipService , handleCalculateFee , fee , handleChooseWardId,setDeliveryAdress,
    deliveryAddressByUserName }) => {
    return (
        <>
            {isOpenDelivery && (
                <div className="overlay">
                    <div className="popup">
                        <div className="row">
                            <div className="address-form-container">
                                <h2>{customTranslate("Address")}</h2>
                                <div className="col-sm-5">
                                    <div className="addresses">
                                        <input type="text" placeholder={customTranslate("Find an Address..." )}className="search-input" />
                                        {
                                            deliveryAddressByUserName.filter(item => item.status ===true)
                                                .map((item,index) => (
                                                <div className="address-item default"
                                                key={index}>
                                                    <span className="icon">🏠</span>
                                                    <div className="address-info">
                                                        <p>{item.deliveryAddressName}</p>
                                                        <p>{item.fullAddress}</p>
                                                        <p>{item.phoneAddress}</p>
                                                    </div>
                                                </div>
                                                 ))
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="new-address">
                                        <h4>{customTranslate("Choose new Delivery Address")}</h4>
                                        <select className="country-region">
                                            <option value="" disabled>{customTranslate("Country/Region")}</option>
                                            <option value="Poland" selected>{customTranslate("Viet Nam")}</option>
                                            <option value="USA">{customTranslate("USA")}</option>
                                            <option value="UK">{customTranslate("UK")}</option>
                                        </select>
                                        <div className="address-selects">
                                            <select className="province" onClick={(e) => handleChooseDistrictByProvinceId(e.target.value)}>
                                                <option disabled selected>{customTranslate("Province")}</option>
                                                {provinceData.map((item, index) => (
                                                    <option key={index} value={item.provinceId}>
                                                        {item.provinceName}
                                                    </option>
                                                ))}
                                            </select>
                                            <select className="district" onClick={(e) => handleChooseWardByDistrictId(e.target.value)}>
                                                <option disabled selected>{customTranslate("District")}</option>
                                                {districtData.map((item, index) => (
                                                    <option key={index} value={item.districtId}>{item.districtName}</option>
                                                ))}
                                            </select>
                                            <select className="street" onClick={(e) => handleChooseWardId(e.target.value)}>
                                                <option value="" disabled selected>{customTranslate("Ward")}</option>
                                                {wardData.map((item, index) => (
                                                    <option key={index} value={item.wardId}>{item.wardName}</option>
                                                ))}
                                            </select>
                                        </div> 
                                        <br></br>
                                        <input type="text" 
                                        placeholder={customTranslate("Address Title")}
                                        className="address-title" 
                                        onChange={(e) => setDeliveryAdress(e.target.value)}
                                         />
                                         <button >{customTranslate("Choose")}</button>
                                        <div className="service-section">
                                            <h4>{customTranslate("Choose Delivery Service")}</h4>
                                            <select className="service-select" onClick={(e) => handleChooseShipService(e.target.value)}>
                                                <option value="" disabled selected>{customTranslate("Choose a service")}</option>
                                                {services.map((item, index) => (
                                                    <option key={index} value={item.serviceId}>
                                                       {customTranslate("")} {item.serviceName} 
                                                        {/* (ExtraFee: {item.extraFeeId}) */}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            fee && (
                                <div> {customTranslate("Total Fee")}: {fee?.toLocaleString('vi-VN')} đ</div>
                            )
                            }

                        <button className="save-button" onClick={handleCalculateFee}>{customTranslate("Choose address")}</button>
                        <button onClick={handleDeliveryAddress} style={{ margin: '10px' }}>{customTranslate("Close")}</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeliveryAddressPopup;
