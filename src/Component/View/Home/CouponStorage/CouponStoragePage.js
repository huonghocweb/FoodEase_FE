import React, { useEffect, useRef, useState } from 'react';
import axiosConfig from '../../../Config/AxiosConfig';
import CouponStorage from './CouponStorage';
import './CouponStorage.css';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAlert from '../../../Config/CustomAlert';

const CouponStoragePage = () => {


    const userName = localStorage.getItem('userNameLogin');
    const [couponStorageByUserId , setCouponStorageByUserId] = useState([]);
    const [alert,setAlert] = useState(null);
    const navigate = useNavigate();
    const codeInputRef = useRef();
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'couponStorageId', 
        totalPage : ''
    })


    const handleChangePaginationState = async (name,value) => {
        setPaginationState(prev => ({
            ...prev ,
            [name] : value
        }))
    }
    const sortOptions = [
        {label : 'Coupon Storage Id', value : 'couponStorageId'},
        {label : 'Coupon Storage Id', value : 'couponStorageId'},
        {label : 'Coupon Storage Id', value : 'couponStorageId'}
    ]



    const fetchCouponStorageByUserName = async() => {
    
        console.log(userName);
        try {
            const resCouponsByUserName = await axiosConfig.get(`/couponStorage/${userName}`,
                {
                    params : {
                        pageCurrent : paginationState.pageCurrent,
                        pageSize : paginationState.pageSize,
                        sortOrder : paginationState.sortOrder,
                        sortBy : paginationState.sortBy
                    }
                }
            )
            console.log(resCouponsByUserName.data.data);
            handleChangePaginationState('totalPage', resCouponsByUserName.data.data.totalPages);
            setCouponStorageByUserId(resCouponsByUserName.data.data.content);
        } catch (error) {
            console.error('error in fetchCouponStorageByUserId',error);
        }
    }


    const handleAddCouponToStorage = async () => {
        console.log(codeInputRef.current.value);
        try {
            const resAddCouponToStorage = await axiosConfig.get(`/couponStorage/addCouponToStorage/${userName}`, 
                {
                    params : {
                        code : codeInputRef.current.value
                    }
                }
            )
            console.log(resAddCouponToStorage.data.data);
            if(resAddCouponToStorage.data.data !== null){
                setAlert({type : 'success', message : 'Add Coupon To Storage Success!'});
            } else{
                setAlert({type : 'error', message : 'Add Coupon To Storage Failed!'});
            }
            fetchCouponStorageByUserName();
        } catch (error) {
            console.error('error in handleAddCouponToStorage',error);
        }
    }


    const removeCoupon = async (couponStorageId) => {
        console.log(couponStorageId);
        try {
            const resRemoveCouponStorage = await axiosConfig.delete(`/couponStorage/${couponStorageId}`);
            alert('Remove Success !');
            fetchCouponStorageByUserName();
        } catch (error) {
            console.error('error in removeCoupon',error);
        }
    }

    useEffect(() => {
        fetchCouponStorageByUserName();
    },[...Object.values(paginationState)]);

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
            <CouponStorage
            couponStorageByUserId = {couponStorageByUserId}
            handleAddCouponToStorage = {handleAddCouponToStorage}
            codeInputRef = {codeInputRef}
           /> 
        </>
    );
};

export default CouponStoragePage;