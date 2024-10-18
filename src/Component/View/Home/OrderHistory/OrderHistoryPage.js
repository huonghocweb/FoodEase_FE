import React, { useEffect, useState } from 'react';
import OrderHistoryList from './OrderHistoryList';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import OrderDetailsPopup from './OrderDetailsPopup';
import './OrderDetails.css';

const OrderHistoryPage = () => {

    const {userName} = useParams();
    const [pageCurrent,setPageCurrent] = useState(0);
    const [pageSize,setPageSize] = useState(8);
    const [sortOrder,setSortOrder] = useState("desc");
    const [sortBy,setSortBy] = useState("orderId");
    const [totalPage,setTotalPage] = useState(0);
    const [isOpentOrderDetails,setIsOpenOrderDetails] = useState(false);
    const [ordersByUserName,setOrdersByUserName] = useState([]);
    const [orderDetailsByOrderId,setOrderDetailsByOrderId] = useState([]);

    useEffect(() => {
        fetchOrder();
    },[pageCurrent,pageSize,sortBy,sortOrder,userName]);

    const fetchOrder = async () => {
        try {
            const resOrderByUserName = await axiosConfig.get(`/order/orderHistory/${userName}`, {
                params: {
                    pageCurrent: pageCurrent,
                    pageSize: pageSize,
                    sortOrder: sortOrder, 
                    sortBy: sortBy
                }
            });
            // Lưu dữ liệu vào state
            setOrdersByUserName(resOrderByUserName.data.data.content);
            setTotalPage(resOrderByUserName.data.data.totalPages);
        } catch (error) {
            // Xử lý lỗi một cách rõ ràng
            if (error.response) {
                console.error('Error in fetchOrder:', error.response.data); // Lỗi từ server
            } else if (error.request) {
                console.error('No response received:', error.request); // Không nhận được phản hồi
            } else {
                console.error('Error:', error.message); // Lỗi khác
            }
        }
    };
    
    
    

    const handlePageCurrent = async(value) => {
        setPageCurrent(value);
    }
    const handlePageSize = async (value) => {
        setPageSize(value);
    }
    const handleSortBy = async (value) => {
        setSortBy(value);
    }
    const handleSortOrder = async(value) => {
        setSortOrder(value);
    }
    
    const openOrderDetailsPopup = async (orderId) => {
        setIsOpenOrderDetails(!isOpentOrderDetails);
        try {
            const resOrderDetailsByOrderId = await axiosConfig.get(`/orderDetails/orderDetailsHistory/${orderId}`);
            setOrderDetailsByOrderId(resOrderDetailsByOrderId.data.data);
        } catch (error) {
            console.error('error in OrderDetailsPopUp',error);
        }
    }

    return (
        <div>
            <OrderHistoryList 
                handleSortBy = {handleSortBy}
                handleSortOrder = {handleSortOrder}
                handlePageCurrent={handlePageCurrent}
                handlePageSize={handlePageSize}
                pageCurrent={pageCurrent}
                totalPage={totalPage}
                ordersByUserName = {ordersByUserName}
                openOrderDetailsPopup = {openOrderDetailsPopup}
            />
            <OrderDetailsPopup 
            isOpentOrderDetails={isOpentOrderDetails}
            orderDetailsByOrderId = {orderDetailsByOrderId}
            openOrderDetailsPopup = {openOrderDetailsPopup}
            />
        </div>
    );
};

export default OrderHistoryPage;