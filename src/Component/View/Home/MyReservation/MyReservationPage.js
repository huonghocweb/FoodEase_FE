import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from './../../../Config/AxiosConfig';
import CustomAlert from './../../../Config/CustomAlert';
import MyReservationList from './MyReservationList';
import ReservationOrderPaymentPopup from './ReservationOrderPaymentPopup';

const MyReservationPage = () => {
    const {userName} = useParams();
    const [bookingInfo,setBookingInfo] = useState([]);
    const [alert,setAlert]  = useState(null);
    const [isOpenReservationOrderPaymentPopup , setIsOpenReservationOrderPaymentPopup] = useState(false);
    const [reservationOrderPayment, setReservationOrderPayment] = useState();

    const [paginationState , setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'desc',
        sortBy : 'reservationId',
        totalPage : 0
    })

    const handlePaginationChange = (name, value) => {
        setPaginationState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleCancelRequestReservation = async (reservationId) => {
        try {
            const resCancelRequestReservation = await axiosConfig.get(`/reservation/cancelReservationRequest/${reservationId}`);
            console.log(resCancelRequestReservation.data.data);
            if(resCancelRequestReservation.data.data !== null){
                setAlert({type : 'success',message : 'Cancel Reservation Success '});
            }else{
                setAlert({type : 'error',message : 'Cannot cancel Reservation , you need cancel before 24h'});
            }
        } catch (error) {
            console.error('error in cancelRequest Reservation',error);
        }
    }

    const handleReservationOrderPayment = async (reservationId) => {
        setIsOpenReservationOrderPaymentPopup(true);
        try {
            const resReservationOrderPaymentByReservationId = await axiosConfig.get(`/reservationOrderPaymentApi/getByReservationId/${reservationId}`);
            console.log(resReservationOrderPaymentByReservationId.data.data);
            setReservationOrderPayment(resReservationOrderPaymentByReservationId.data.data);
        } catch (error) {
            console.error('error in handleReservationOrderPayment ' , error);            
        }
    }
    const fetchReservation = async() => {
        try {
            const resReservationByUserName = await axiosConfig.get(`/reservation/getByUserName/${userName}`,{
                params : {
                    pageCurrent : paginationState?.pageCurrent,
                    pageSize : paginationState?.pageSize ,
                    sortOrder : paginationState?.sortOrder,
                    sortBy : paginationState?.sortBy
                }
            });
            setBookingInfo(resReservationByUserName.data.data.content);
            handlePaginationChange('totalPage',resReservationByUserName.data.data.totalPages);
        } catch (error) {
            console.error('error in fetch Reservation',error);
        }
    }

    const sortOptions = [
        {value : 'reservationId', label : 'Reservation Id'},
        {value : 'totalDeposit', label : 'Total Deposit'},
        {value : 'bookTime', label : 'Book Time '},
        {value : 'checkinTime', label : 'Checkin Time'},
        {value : 'checkoutTime', label : 'Checkout Time'}
    ]
    useEffect(() => {
        fetchReservation();
    },[userName,paginationState])
    return (
        <>
         {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
  
            <MyReservationList
                bookingInfo={bookingInfo}
                paginationState = {paginationState}
                handlePaginationChange = {handlePaginationChange}
                handleCancelRequestReservation = {handleCancelRequestReservation}
                sortOptions = {sortOptions}
                handleReservationOrderPayment = {handleReservationOrderPayment}
            />
            <ReservationOrderPaymentPopup 
                isOpenReservationOrderPaymentPopup = {isOpenReservationOrderPaymentPopup}
                reservationOrderPayment={reservationOrderPayment}
                setIsOpenReservationOrderPaymentPopup = {setIsOpenReservationOrderPaymentPopup}
            />
        </>
    );
};

export default MyReservationPage;