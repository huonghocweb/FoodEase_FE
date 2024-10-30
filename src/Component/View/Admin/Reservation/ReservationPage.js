import React, { useEffect, useState } from 'react';
import ReservationList from './ReservationList';
import axiosConfig from './../../../Config/AxiosConfig';

const ReservationPage = () => {
    const [reservations,setReservations] = useState([]);
    const [paginationState,setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'desc',
        sortBy : 'reservationId',
        totalPage : 0,
        startDate : '',
        endDate : '',
        keyWord : ''
    })
    const handlePaginationChange = (name, value) => {
        setPaginationState(prevState => ({
            ...prevState ,
            [name] : value
        }))
    }
    const fetchReservations = async  () => {
        try {
            const resReservations= await axiosConfig.get(`/reservation`,{
                params  : {
                    pageCurrent :paginationState.pageCurrent,
                    pageSize : paginationState.pageSize,
                    sortOrder : paginationState.sortOrder,
                    sortBy : paginationState.sortBy,
                    startDate : paginationState.startDate,
                    endDate : paginationState.endDate,
                    keyWord : paginationState.keyWord
                }
            })
            setReservations(resReservations.data.data.content);
            handlePaginationChange('totalPage',resReservations.data.data.totalPages)
        } catch (error) {
            console.error('error in fetchReservations ',error);
        }
    }

    const sortOptions = [
        {value : 'reservationId', label : 'ReservationId'},
        {value : 'totalDeposit', label : 'ToTal Deposit'},
        {value : 'checkinTime', label : 'CheckIn Time'},
        {value : 'checkoutTime', label : 'Checkout Time'},
        {value : 'bookTime', label : 'Book Time'},
        {value : 'reservationStatus', label : 'Reservation Status'}
    ]
    useEffect(() => {
        fetchReservations();
    }, [...Object.values(paginationState)]);
    return (
        <>
          <ReservationList 
            paginationState = {paginationState}
            handlePaginationChange = {handlePaginationChange}
            reservations={reservations}
            sortOptions = {sortOptions}
          />  
        </>
    );
};

export default ReservationPage;