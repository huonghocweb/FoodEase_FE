import React, { useEffect, useState } from 'react';
import axiosConfig from './../../../Config/AxiosConfig';
import ReservationOrderPaymentList from './ReservationOrderPaymentList';
import ReservationOrderPaymentDetailsPopup from './ReservationOrderPaymentDetailsPopup';

const ReservationOrderPaymentPage = () => {
    
    const [isOpenReservationOrderDetailsPopup,setIsOpenReservationOrderDetailsPopup] = useState(null);
    const [reservationOrderPaymentById,setReservationOrderPaymentById]= useState([]);
    const [reservationOrderPayment , setReservationOrderPayment] = useState([]);
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0, 
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'reservationOrderPaymentId',
        totalPage : 0
    })
    const handleChangePaginationState = async (name, value) => {
        setPaginationState(prev => ({
            ...prev , 
            [name] : value
        }))
    }
    const handleReservationOrderPaymentById = async (reservationOrderPaymentId) => {
        setIsOpenReservationOrderDetailsPopup(true);
        try {
            const resReservationOrderPaymentById = await axiosConfig.get(`/reservationOrderPaymentApi/getById/${reservationOrderPaymentId}`);
            console.log(resReservationOrderPaymentById.data.data);
            setReservationOrderPaymentById(resReservationOrderPaymentById.data.data);
        } catch (error) {
            console.error('error in handleReservationOrderPaymentById',error);
        }
    }
    const fetchReservationOrderPayment = async () => {
        try {
            const resReservationOrderPayment = await axiosConfig.get(`/reservationOrderPaymentApi/getAll`, {
                params : {
                    pageCurrent : paginationState.pageCurrent,
                    pageSize : paginationState.pageSize , 
                    sortOrder : paginationState.sortOrder,
                    sortBy : paginationState.sortBy
                }
            })
            setReservationOrderPayment(resReservationOrderPayment.data.data.content);
            console.log(resReservationOrderPayment.data.data);
            handleChangePaginationState('totalPage',resReservationOrderPayment.data.data.totalPages);
        } catch (error) {
            console.error('error in fetchReservationOrderPayment', error);
        }
    }

    const sortOptions = [
        {value : 'reservationOrderPaymentId' , label : 'Id'},
        {value : 'reservationOrderPaymentId' , label : 'Id'}
    ]
    useEffect(() => {
        fetchReservationOrderPayment();
    },[...Object.values(paginationState)])
    return (
        <>
            <ReservationOrderPaymentList 
                paginationState = {paginationState}
                handleChangePaginationState = {handleChangePaginationState}
                sortOptions = {sortOptions}
                reservationOrderPayment={reservationOrderPayment}
                handleReservationOrderPaymentById = {handleReservationOrderPaymentById}
            />
            <ReservationOrderPaymentDetailsPopup 
                isOpenReservationOrderDetailsPopup={isOpenReservationOrderDetailsPopup}
                setIsOpenReservationOrderDetailsPopup={setIsOpenReservationOrderDetailsPopup}
                reservationOrderPaymentById = {reservationOrderPaymentById}
            />
        </>
    );
};

export default ReservationOrderPaymentPage;