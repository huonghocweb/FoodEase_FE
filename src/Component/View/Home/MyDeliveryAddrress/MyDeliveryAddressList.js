import React from 'react';
import './MydeliveryAddress.css';
import PaginationControls from './../../../Include/Pagination/PaginationControls';
const MyDeliveryAddressList = ({deliveryAddress,setIsOpenAddressPopup, paginationState, handlePaginationChange,sortOptions, fetchDeliveryAddressById, handleDeleteDeliveryAddress}) => {
   console.log(deliveryAddress);
    return (
        <>
        <div class="address-container">
        <div class="address-header">
            <h2 class="address-title">My Delivery Address   </h2>
            <button class="add-new-address-btn" onClick={() =>setIsOpenAddressPopup(true)}>+ New Delivery Address</button>
        </div>
        <PaginationControls 
            paginationState={paginationState}
            handlePaginationChange={handlePaginationChange}
            sortOptions = {sortOptions}
        />
        <div class="address-list">
        {
            deliveryAddress
            .filter(item => item.status === true)
            .map((item,index) => (
                <div class="address-item" key={index}>
            <div class="address-info">
                <p class="address-name">{item.deliveryAddressName}</p>
                <p class="address-phone">{item.phoneAddress}</p>
                <p class="address-details" >{item.fullAddress}</p>
                <span class="default-badge">Default </span>
            </div>
            <div class="address-actions">
                <button class="action-btn" onClick={() => fetchDeliveryAddressById(item.deliveryAddressId)}>Update</button>
                <button class="set-default action-btn">Set Default </button>
                <button class="action-btn" onClick={() => handleDeleteDeliveryAddress(item.deliveryAddressId)}>Delete Address </button>
            </div>
            </div>
            ))
        }
        </div>
        </div>   
        </>
    );
};

export default MyDeliveryAddressList;