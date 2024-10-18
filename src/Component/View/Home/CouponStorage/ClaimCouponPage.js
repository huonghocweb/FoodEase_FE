import React from 'react';
import { useForm } from 'react-hook-form';
import ClaimCoupon from './ClaimCoupon';
import axiosConfig from '../../../Config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const ClaimCouponPage = () => {

    const {register,handleSubmit, reset} = useForm();
    const navigate = useNavigate();

    const submitAddCoupon = async (data) => {
        const formData = new FormData();
        const payload = {
            ...data
        }
        console.log(payload);
        formData.append('couponStorageRequest',new Blob([JSON.stringify(payload)] , {type : 'application/json'}));
        try {
            const resCreateCouponStorage = await axiosConfig.post(`/couponStorage` , formData);
            if(resCreateCouponStorage.data.data !== null){
                alert('Claim Coupon Success!');
                navigate(`/couponStorage`);
            }else {
                alert('Claim Coupon Failed');
            }
        } catch (error) {
            console.error('error in submitAddCoupon',error)
        }
    }

    return (
        <div>
            <ClaimCoupon 
            handleSubmit={handleSubmit}
            register={register}
            submitAddCoupon={submitAddCoupon}
            />
        </div>
    );
};

export default ClaimCouponPage;