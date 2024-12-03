import React, { useEffect } from 'react';
import './DeliveryAddress.css';

const DeliveryAddressPopup = ({
    isOpenDelivery,
    handleDeliveryAddress,
    provinceData,
    handleChooseDistrictByProvinceId,
    districtData,
    handleChooseWardByDistrictId,
    wardData,
    services,
    handleChooseShipService,
    handleCalculateFee,
    fee,
    handleChooseWardId,
    setDeliveryAdress,
    deliveryAddressByUserName , 
    hanldeAddressByDeliveryAddressId , 
    watch,
    register
}) => {
    const provinceId = watch('provinceId'); // Lấy giá trị hiện tại của provinceId
    const districtId = watch('districtId'); // Lấy giá trị hiện tại của districtId
    const wardCode = watch('wardCode');
    useEffect(() => {
        if (provinceId && districtData.length > 0) {
            handleChooseDistrictByProvinceId(provinceId);
        }
    }, [provinceId, districtData]);
    
    useEffect(() => {
        if (districtId && wardData.length > 0) {
            handleChooseWardByDistrictId(districtId);
        }
    }, [districtId, wardData]);
    
    return (
        <>
            {isOpenDelivery && (
                <div className="overlay">
                    <div className="popup">
                        <div className="row">
                            <div className="address-form-container">
                                <h2>Addresses</h2>
                                <div className="col-sm-4">
                                    <div className="addresses">
                                        <input type="text" placeholder="Find an Address..." className="search-input" />
                                        {deliveryAddressByUserName
                                            .filter(item => item.status === true)
                                            .map((item, index) => (
                                                <div className="address-item default" key={index}>
                                                    <input onChange={() => hanldeAddressByDeliveryAddressId(item.deliveryAddressId)} type="checkbox" className="address-checkbox" />
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
                                        <h4>Choose new Delivery Address</h4>
                                        <select className="country-region">
                                            <option value="" disabled>Country/Region</option>
                                            <option value="Poland" selected>Viet Nam</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                        </select>
                                        <div className="address-selects">
                                        <select
                                            {...register('provinceId')} 
                                            className="province"
                                            value={provinceId || ''}
                                            onChange={(e) => handleChooseDistrictByProvinceId(e.target.value)}
                                        >
                                            <option value="" disabled>Province</option>
                                            {provinceData.map((item, index) => (
                                                <option key={index} value={item.provinceId}>
                                                    {item.provinceName}
                                                </option>
                                            ))}
                                        </select>
                                            <select
                                             {...register('districtId')} 
                                             className="district" 
                                             value={districtId || ''}
                                             onClick={(e) => handleChooseWardByDistrictId(e.target.value)}
                                             >
                                                <option disabled selected>District</option>
                                                {districtData.map((item, index) => (
                                                    <option key={index} value={item.districtId}>{item.districtName}</option>
                                                ))}
                                            </select>
                                            <select
                                             {...register('wardCode')} 
                                             className="street" 
                                             value={wardCode || ''}
                                            onClick={(e) => handleChooseWardId(e.target.value)}
                                            >
                                                <option value="" disabled selected>Ward</option>
                                                {wardData.map((item, index) => (
                                                    <option key={index} value={item.wardId}>{item.wardName}</option>
                                                ))}
                                            </select>
                                        </div> 
                                        <br />
                                        <input
                                         {...register('houseNumber')} 
                                            type="text"
                                            placeholder="Home Number"
                                            style={{ fontSize: '20px' }}
                                            onChange={(e) => setDeliveryAdress(e.target.value)}
                                        />
                                        <div className="service-section">
                                            <h4>Choose Delivery Service</h4>
                                            <select className="service-select" onClick={(e) => handleChooseShipService(e.target.value)}>
                                                <option value="" disabled selected>Choose a service</option>
                                                {services.map((item, index) => (
                                                    <option key={index} value={item.serviceId}>
                                                        {item.serviceName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {fee > 0 && (
                            <div> Total Fee: {fee?.toLocaleString('vi-VN')} đ</div>
                        )}
                        <button className="save-button" onClick={handleCalculateFee}>Choose address</button>
                        <button onClick={handleDeliveryAddress} style={{ margin: '10px' }}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeliveryAddressPopup;