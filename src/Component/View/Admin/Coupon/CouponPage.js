import React, { useEffect, useState } from 'react';
import CouponList from './CouponList';
import axiosConfig from '../../../Config/AxiosConfig';
import { useNavigate } from 'react-router-dom';

const CouponPage = () => {

    const [pageCurrent,setPageCurrent] = useState(0);
    const [pageSize,setPageSize] = useState(8);
    const [sortOrder,setSortOrder] = useState("desc");
    const [sortBy,setSortBy] = useState("couponId");
    const [coupons,setCoupons] = useState([]);
    const [totalPage,setTotalPage] = useState(0);

    useEffect(()  => {
        fetchCoupons();
    },[pageCurrent,pageSize,sortOrder,sortBy]);

    const fetchCoupons = async () => {
        try {
            const resCouponse = await axiosConfig.get(`/coupon`, 
                {
                    params : {
                        pageCurrent : pageCurrent, 
                        pageSize : pageSize,
                        sortOrder : sortOrder,
                        sortBy : sortBy
                    }
                }
            )
            setCoupons(resCouponse.data.data.content);
            setTotalPage(resCouponse.data.data.totalPages);
          
            const couponData = resCouponse.data.data.content;
            console.log(couponData);
        } catch (error) {
            console.error('error in fetchCoupons',error);
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
        <div>
            <CouponList
            coupons = {coupons}
            handleSortBy = {handleSortBy}
            handleSortOrder = {handleSortOrder}
            handlePageCurrent = {handlePageCurrent}
            handlePageSize = {handlePageSize}
            pageCurrent={pageCurrent}
            totalPage={totalPage}
             />
        </div>
    );
};

export default CouponPage;