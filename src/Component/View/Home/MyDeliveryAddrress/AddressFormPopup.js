import React, { useEffect } from 'react';
import './AddressFormPopup.css';

const AddressFormPopup = ({ isOpenAddressPopup,handleCloesPopup,handleDeliveryAddressForm, register, handleSubmit , errors  ,
  provinces,districts,wards,handleGetDistrictByProvinceId ,handleGetWardByDistrictId , dataEdit}) => {
    if(dataEdit){
      console.log(dataEdit);
    }else{
      console.log(1111);
    }
  return (
    <>
    {
      isOpenAddressPopup && (
    <div className="address-popup">
      <div className="address-popup-content">
        <span className="close" onClick={handleCloesPopup}>&times;</span>
        <h2>Thêm địa chỉ mới</h2>
        <form onSubmit={handleSubmit(handleDeliveryAddressForm)}>
          <div className="form-row">
            <div className="form-group">
              <label>Address Name:</label>
              <input 
                type="text" 
                placeholder="Address Name"
                {...register('deliveryAddressName' , {
                  required : 'Address Name is Not Empty'
                })}
              />
              {
                errors.deliveryAddressName && (
                  <p>{errors?.deliveryAddressName.message}</p>
                )
              }
            </div>
            <div className="form-group">
              <label>Phone Number  :</label>
              <input 
                type="tel" 
                placeholder="0912 345 678"
                {...register("phoneAddress", 
                {
                  required : 'Phone Address is required'
                })}
              />
              {
                errors.phoneAddress && (
                  <p>{errors?.phoneAddress.message}</p>
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label>Province:</label>
            <select 
              {...register('provinceId' ,{
                required : 'Province is required',
                onChange : (e) => handleGetDistrictByProvinceId(e.target.value)
              })}
            >
              <option value="">Choose Province </option>
              {provinces.map((prov,index) => (
                <option key={index} value={prov.ProvinceID}>{prov.ProvinceName}</option>
              ))}
            </select>
            {
              errors.provinceId && (
                <p>{errors?.provinceId.message}</p>
              )
            }
          </div>
          <div className="form-group">
            <label>Districts:</label>
            <select 
              {...register('districtId' , {
                required : 'District is required' , 
                onChange : (e) => handleGetWardByDistrictId(e.target.value)
              })}
            >
              <option value="" >Choose Districts : </option>
              {districts && (
                districts.map((item,index) => (
                  <option key={index} value={item.DistrictID} >{item.DistrictName}</option>
                ))
              )}
            </select>
            {
              <p>{errors?.districtId?.message}</p>
            }
          </div>
          <div className="form-group">
            <label>Ward:</label>
            <select 
              {...register('wardCode',
              {
                required : 'Ward is required'
              }
              )}
            >
              <option value="" >Choose Ward :</option>
             {wards && (
                wards.map((item,index) => (
                  <option key={index} value={item.WardCode}>{item.WardName}</option>
                ))
             )}
            </select>
            {
                <p>{errors?.wardCode?.message}</p>
              }
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>House Number:</label>
              <input 
                type="text" 
                placeholder="House Number , Ward Number"
                {...register('houseNumber', {
                  required : 'House Number is required'
                })}
              />
              {
                <p>{errors?.houseNumber?.message}</p>
              }
            </div>
          </div>
          {
            dataEdit ? <button type="submit">Update</button> : <button type="submit">Create</button>
          }
          
        </form>
      </div>
    </div>
      )
    }

    </>
  );
};

export default AddressFormPopup;
