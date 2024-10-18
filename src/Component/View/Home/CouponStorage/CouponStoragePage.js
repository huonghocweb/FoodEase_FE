import React, { useEffect, useState } from 'react';
import axiosConfig from '../../../Config/AxiosConfig';
import CouponStorage from './CouponStorage';

const CouponStoragePage = () => {

    const [coupons,setCoupons] = useState([]);
    const [pageCurrent,setPageCurrent] = useState(0);
    const [pageSize,setPageSize] = useState(8);
    const [sortOrder,setSortOrder] = useState("desc");
    const [sortBy,setSortBy] = useState("couponStorageId");
    const [totalPage,setTotalPage] = useState();

    useEffect(() => {
        fetchCoupons();
    },[pageCurrent,pageSize,sortBy,sortOrder]);

    const fetchCoupons =  async () => {
        const username = 'huongpham';
        try {
            const resCouponsByUserName = await axiosConfig.get(`/couponStorage/${username}`,
                {
                    params : {
                        pageCurrent : pageCurrent,
                        pageSize : pageSize,
                        sortOrder : sortOrder,
                        sortBy : sortBy
                    }
                }
            )
            console.log(resCouponsByUserName.data);
            setCoupons(resCouponsByUserName.data.data.content);
            setTotalPage(resCouponsByUserName.data.data.totalPages);
        } catch (error) {
            console.error('error in fetch Coupons', error);
        }
    }

    const removeCoupon = async (couponStorageId) => {
        console.log(couponStorageId);
        try {
            const resRemoveCouponStorage = await axiosConfig.delete(`/couponStorage/${couponStorageId}`);
            alert('Remove Success !');
            fetchCoupons();
        } catch (error) {
            console.error('error in removeCoupon',error);
        }
    }

    const handleSortBy = async(value) => {
        setSortBy(value);
    }
    const handleSortOrder = async (value) => {
        setSortOrder(value);
    }
    const handlePageCurrent = async (value) => {
        setPageCurrent(value);
    }
    const handlePageSize = async (value) => {
        setPageSize(value);
    }
    return (
        <>
           <CouponStorage 
            coupons={coupons}
            handleSortBy={handleSortBy}
            handleSortOrder={handleSortOrder}
            handlePageCurrent={handlePageCurrent}
            handlePageSize={handlePageSize}
            pageCurrent={pageCurrent}
            totalPage={totalPage}
            removeCoupon = {removeCoupon}
           /> 
        </>
    );
};

export default CouponStoragePage;