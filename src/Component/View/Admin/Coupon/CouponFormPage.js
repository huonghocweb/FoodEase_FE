import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CouponForm from './CouponForm';
import axiosConfig from '../../../Config/AxiosConfig';
import CustomAlert from '../../../Config/CustomAlert';
import { useNavigate, useParams } from 'react-router-dom';

const CouponFormPage = () => {

    const {couponId} = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [couponById,setCouponById] = useState();
    const [imageCoupon,setImageCoupon] = useState([]);
    const navigate = useNavigate();
    const fileInputRef = useRef(null); 
    const [alert , setAlert] = useState(null);

    useEffect (() => {
        if(couponId ){
            fectchCoupon();
        }
    },[couponId]);
    const fectchCoupon = async () => {
        try {
            const resCouponByCouponId = await axiosConfig.get(`/coupon/${couponId}`);
            console.log(resCouponByCouponId.data.data);
            setCouponById(resCouponByCouponId.data.data);
            const couponById = resCouponByCouponId.data.data;
            setImageCoupon(couponById.imageUrl);
            reset({
                couponId : couponId , 
                code : couponById.code , 
                description : couponById.description , 
                imageUrl :couponById.imageUrl,
                startDate : couponById.startDate , 
                endDate : couponById.endDate , 
                useLimit : couponById.useLimit , 
                usedCount: couponById.usedCount , 
                discountPercent: couponById?.discountPercent ? couponById.discountPercent * 100 : 0 ,
                maxDiscountAmount : couponById.maxDiscountAmount
            })
            // const copponData = resCouponByCouponId.data.data;
            // const resImage = await axiosConfig.get(`/files/coupon/${copponData.imageUrl}`,{responseType : 'blob'});
            // setImageCoupon(URL.createObjectURL(resImage.data));

        } catch (error) {
            console.error('error in Coupons')
        }
    }

    const formatNumber = (value) => {
        return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
      };

    const submitCoupon = async (data)=> {
        const formData = new FormData();
        console.log(data.discountPercent);
        data.discountPercent = data.discountPercent / 100;
        console.log(data.discountPercent);
        const payload = {
            ...data
        }
        formData.append('couponRequest',new Blob([JSON.stringify(payload)], {type : 'application/json'}));

        const files= await handleImage();
        if(files.length > 0){
          for(const file of files ){
            formData.append("couponImage",file);
          }
        }

        try {
            if(couponId){
                const resCouponUpdate= await axiosConfig.put(`/coupon/coupon/${couponId}`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
                if(resCouponUpdate.data.data !== null){
                    setAlert({type : 'success' , message : 'Update Coupon Success'})
                }
                console.log(resCouponUpdate.data.data);
            }else{
                const resCouponCreate = await axiosConfig.post(`/coupon/coupon`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
                if(resCouponCreate.data.data !== null){
                    setAlert({type : 'success' , message : 'Create Coupon Success'})
                }
                console.log(resCouponCreate.data.data);
            }
            navigate(`/admin/coupons`);
        } catch (error) {
            if (error.response) {
                // Kiểm tra lỗi HTTP
                if (error.response.status === 403) {
                    setAlert({type : 'error' , message : ' You do not have permission. !'});
                } else {
                    alert(`Error: ${error.response.statusText}`);
                }
            console.error('error in submitCoupon',error);
        }
            }
        }

    const handleImage = async () =>{
        // Khi liên kết useRef với input file , truy cập vào current.files để lấy ra files
        // Lúc này files là 1 đối tượng FileList, kh phải mảng nhưng sẽ chứa danh sách tệp chọn từ thẻ input 
        // Và sử dụng như 1 mảng thông thường
        let files = fileInputRef.current.files;
        // Kiểm tra nếu files không được chọn thì
        if( files.length === 0){
          return [];
        }
        // Nếu files được chọn, chuyển files thành mảng và trả về 
          return Array.from(files);
      }
    
    return (
        <>
            {
                alert && (
                    <CustomAlert 
                        type={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )
            }
            <CouponForm
            register ={register}
            handleSubmit = {handleSubmit}
            handleImage = {handleImage}
            fileInputRef = {fileInputRef}
            reset = {reset}
            submitCoupon = {submitCoupon}
            couponId = {couponId}
            errors = {errors}
            imageCoupon = {imageCoupon}
             /> 
        </>
    );
};

export default CouponFormPage;