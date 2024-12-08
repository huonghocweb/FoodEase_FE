import React from 'react';
import './CouponseStoragePopup.css';
import CouponStorage from '../CouponStorage/CouponStorage';

const CouponStoragePopup = ({isOpenCouponStorage , handleOpenCouponStorage , couponStorageByUserId , handelCheckCoupon}) => {
    return (
        <>
            {
                isOpenCouponStorage && (
                    <div className='couponStorage-overlay'>
                        <div className='couponStorage-popup'>
                            <CouponStorage
                                couponStorageByUserId = {couponStorageByUserId}
                                handelCheckCoupon = {handelCheckCoupon}
                            />
                            <button className='btn btn-primary' onClick={handleOpenCouponStorage}>Cloes</button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CouponStoragePopup;