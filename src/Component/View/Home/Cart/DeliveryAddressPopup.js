import React, { useEffect } from 'react';
import './DeliveryAddress.css';

const DeliveryAddressPopup = ({
    isOpenDelivery , handleOpenDelivery , deliveryByUserId , addressState , 
    handleChangeAddressDataState , hanldeDistrictByProvinceId ,hanldeWardByDistrictId , handleGetFee , handleAddressData , 
    handleGetDeliveryById
}) => {
    return (
        <>
            {isOpenDelivery && (
                <div className="delivery-overlay">
                    <div className="delivery-popup">
                        <div className="row d-flex">
                            <div className="col-sm-4">
                                <div className="addresses">
                                    <h2>My Addresses</h2>
                                    <input type="text" placeholder="Find an Address..." className="search-input" />
                                    {deliveryByUserId
                                        .filter(item => item.status === true)
                                        .map((item, index) => (
                                            <div className="address-item default" key={index}>
                                                <input 
                                                    name='deliveryAddress'
                                                    value={item.deliveryAddressId}
                                                    onChange={() => handleGetDeliveryById(item.deliveryAddressId)} 
                                                    type="radio" 
                                                    className="address-checkbox" 
                                                />
                                                <span className="icon">🏠</span>
                                                <div className="address-info">
                                                    <p>{item.deliveryAddressName}</p>
                                                    <p>{item.fullAddress}</p>
                                                    <p>{item.phoneAddress}</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className="new-address">
                                    <h4>New Delivery Address</h4>
                                    <select className="country-region">
                                        <option value="" disabled>Country/Region</option>
                                        <option value="Poland" selected>Viet Nam</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                    </select>
                                    <div className="address-selects">
                                        <select
                                        value={addressState.provinceChoosed.ProvinceID}
                                        onChange={(e) => hanldeDistrictByProvinceId(e.target.value)}
                                        >
                                            <option value="" selected disabled>Province</option>
                                            {
                                                addressState.provinceData.map((item,index) => (
                                                    <option
                                                     value={item.ProvinceID}
                                                     key={index}
                                                     > {item.ProvinceName}</option>
                                                ))
                                            }
                                        </select>
                                        <select
                                        value={addressState.districtChoosed.DistrictID}
                                         onChange={(e) => hanldeWardByDistrictId(e.target.value)}
                                         className="district">
                                            <option disabled selected>District</option>
                                            {
                                                addressState.districtData.map((item,index) => (
                                                    <option
                                                     value={item.DistrictID}
                                                     key={index}
                                                     > {item.DistrictName}</option>
                                                ))
                                            }
                                        </select>
                                        <select 
                                        value={addressState.wardChoosed.WardCode}
                                        onChange={(e) => {
                                        const wardCodeChoosed = e.target.value ;
                                         handleChangeAddressDataState('wardChoosed',addressState.wardData.find(item => item.WardCode === wardCodeChoosed));
                                         } }
                                        
                                        className="street">
                                            <option value="" disabled selected>Ward</option>
                                            {
                                                addressState.wardData.map((item,index) => (
                                                    <option
                                                     value={item.WardCode}
                                                     key={index}
                                                     > {item.WardName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <br />
                                    <input 
                                    value={addressState.houseNumber}
                                    onChange={(e) => handleChangeAddressDataState('houseNumber',e.target.value)}
                                    type="text" placeholder="Home Number" style={{ fontSize: '20px' }} />
                                    <div className="service-section">
                                        <h4>Delivery Service</h4>
                                        <select 
                                        onChange={(e) => handleGetFee(e.target.value)}
                                        className="service-select">
                                            <option value="" disabled selected>Choose a service</option>
                                            {
                                                addressState.shipServiceData.map((item,index) => (
                                                    <option value={item.service_type_id} key={index}>{item.short_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div style={{fontSize : '20px'}}>Lead Time : {(addressState.shipFee ? addressState.leadTime : ' ')} hours</div>
                                    <div style={{fontSize : '20px'}}>Total Fee: {(addressState.shipFee ? addressState.shipFee : ' ').toLocaleString('vi')} đ</div>
                                    <button onClick={handleAddressData} className="save-button">Choose address</button>
                                    <button onClick={handleOpenDelivery} style={{ margin: '10px' }}>Close</button>
                            </div>
                        </div>
                </div>
                </div>
            )}
        </>
    );
};

export default DeliveryAddressPopup;