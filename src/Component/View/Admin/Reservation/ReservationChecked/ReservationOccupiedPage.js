import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../../../Config/AxiosConfig';
import CustomAlert from '../../../../Config/CustomAlert';
import ReservationOccupiedList from './ReservationOccupiedList';
import ReservationCheckoutPopup from '../ReservationCheckout/ReservationCheckoutPopup';

const ReservationOccupiedPage = () => {
  const {reservationId} = useParams();
  const [alert ,setAlert] = useState(null);
  const [reservationById , setReservationById] = useState();
  const [foods,setFoods] = useState([]);
  const [foodIdSelected,setFoodIdSelected] = useState([]);
  const [foodOrderItem ,setFoodOrderItem] = useState({});
  const [reservationOrder,setReservationOrder] = useState();
  const [isOpentCheckoutPopup, setIsOpentCheckoutPopup] = useState(null);
  const [paymentMethod ,setPaymentMethod ] = useState();
  const userName = localStorage.getItem(`userNameLogin`);
  const baseUrlReturn = window.location.origin;

  const navigate = useNavigate();
  const [paginationState,setPaginationState] = useState({
    pageCurrent : 0,
    pageSize : 4,
    sortOrder : 'desc',
    sortBy : 'foodId',
    totalPage : ''
  })
  const handlePaginationChange  = async (name,value) => {
    setPaginationState(prevState => ({
        ...prevState,
        [name] : value
    }))
  }
  const handleSelecteFood = async (food) => {
      if(foodIdSelected.includes(food)){
        setFoodIdSelected(foodIdSelected.filter(item => item.foodId !== food.foodId));
      }else{
        setFoodIdSelected([...foodIdSelected,food]);
      }
      console.log(foodIdSelected);
  }
  const handleFoodOrderItemChange = async (foodId, quantity) => {
      setFoodOrderItem((prevOrderItem ) => ({
        ...prevOrderItem,
        [foodId] : quantity
      })) 
  }

  const handleReservationOrder = async ()  => {
    console.log(foodOrderItem);
    const formData = new FormData();
    formData.append('foodOrderItem', new Blob([JSON.stringify(foodOrderItem)] , {type : 'application/json'}));
    try {
      const resReservationOrder = await axiosConfig.post(`/reservationOrderDetail/createReservationOrderDetails/${reservationId}`,formData);
      console.log(resReservationOrder.data);
      if(resReservationOrder.data.data !== null ){
        setFoodOrderItem({});
        setFoodIdSelected([]); 
        setAlert({type : 'success', message : 'Order Food Success'});
      }else{
        setAlert({type : 'erorr' , message : 'Order Food Faild'});
      }
      fetchReservaionOrderByReservationId();
    } catch (error) {
      console.error('erorr in handleReservationOrder',error)
    }
  }

  const handleCheckoutReservationOrder = async (paymentMethodId) => {
    const reservationOrderId = reservationOrder.reservationOrderId;
    console.log(reservationOrder.reservationOrderId);
    console.log(paymentMethodId);
    console.log(baseUrlReturn);
    try {
      // const resCheckOutReservationOrder = await axiosConfig.post(`/reservationOrderPaymentApi/${reservationOrderId}/${paymentMethodId}`);
      const resCheckOutReservationOrder = await axiosConfig.get(`/paymentMethod/payment/${reservationOrderId}/${reservationOrder.totalPrice}`, {
        params : {
          paymentMethodId : paymentMethodId, 
          baseUrlReturn : baseUrlReturn ,
          userName : userName
        }
      })
       console.log(resCheckOutReservationOrder.data.data);
       if(paymentMethodId !== 5 && resCheckOutReservationOrder.data.data !== null){
        window.location.href = resCheckOutReservationOrder.data.data;
       }
      if(resCheckOutReservationOrder.data.data !== null){
        setAlert({type : 'success' , message : 'Checkout Success'});
        navigate('/admin/reservation');
      }else {
        setAlert({type : 'error' , message : 'Checkout Failed'});
      }
    } catch (error) {
      console.log('error in handleCheckoutReservationOrder',error);
    }
  }
  const fetchReservationById = async () => {
    try {
      const resReservationById = await axiosConfig.get(`/reservation/${reservationId}`);
      console.log(resReservationById.data.data);
      setReservationById(resReservationById.data.data);
    } catch (error) {
      console.error('error  in fetchReservationById',error);
    }
  }
  const fetchPaymentMethod = async () => {
    try {
      const resPaymentMethods = await axiosConfig.get(`/payment/getAll`);
      console.log(resPaymentMethods);
      setPaymentMethod(resPaymentMethods.data.data);
    } catch (error) {
      console.error('error in fetchPaymentMethod ' + error);
    }
  }
  const handleOpenCheckoutPopup =  async( ) => {
    setIsOpentCheckoutPopup(!isOpentCheckoutPopup);
  }
  const fetchFoods = async () => {
    try {
      const resGetAllFood = await axiosConfig.get(`/user/food/getAllFoodByHuong`,{
        params : {
          pageCurrent : paginationState.pageCurrent,
          pageSize : paginationState.pageSize, 
          sortOrder : paginationState.sortOrder,
          sortBy : paginationState.sortBy
        }
      })
      setFoods(resGetAllFood.data.data.content);
      handlePaginationChange('totalPage',resGetAllFood.data.data.totalPages)
    } catch (error) {
      console.error('error in fetchFoods',error);
    }
  }
  const fetchReservaionOrderByReservationId = async() => {
    try {
      const resReservaionOrderByReservationId = await axiosConfig.get(`/reservationOrder/getByReservationId/${reservationId}`);
      console.log(resReservaionOrderByReservationId.data.data);
      setReservationOrder(resReservaionOrderByReservationId.data.data);
    } catch (error) {
      console.error('error in fetchReservaionOrderById',error);
    }
  }
  const sortOptions = [
    {value : 'foodId' , label : 'Food ID'},
    {value : 'foodName' , label : 'Food Name'},
    {value : 'basePrice' , label : 'Base Price '},
    {value : 'discount' , label : 'Discount  '},
  ]
  useEffect(() => {
    fetchReservationById();
    fetchFoods ();
    fetchReservaionOrderByReservationId();
    fetchPaymentMethod();
  },[reservationId , ...Object.values(paginationState) ])
    return (
        <>
        {alert && (
          <CustomAlert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
           />
        )}
             <ReservationOccupiedList
              reservationById={reservationById}
              foods = {foods}
              paginationState ={ paginationState}
              handlePaginationChange = {handlePaginationChange}
              sortOptions = {sortOptions}
              handleSelecteFood  = {handleSelecteFood}
              foodIdSelected = {foodIdSelected}
              handleReservationOrder = {handleReservationOrder}
              handleFoodOrderItemChange = {handleFoodOrderItemChange}
              reservationOrder = {reservationOrder}
              handleOpenCheckoutPopup = {handleOpenCheckoutPopup}
              />
              <ReservationCheckoutPopup
                isOpentCheckoutPopup={isOpentCheckoutPopup}
                paymentMethod={paymentMethod}
                reservationOrder={reservationOrder}
                handleCheckoutReservationOrder = {handleCheckoutReservationOrder}
                handleOpenCheckoutPopup = {handleOpenCheckoutPopup}
               />
        </>
    );
};

export default ReservationOccupiedPage;