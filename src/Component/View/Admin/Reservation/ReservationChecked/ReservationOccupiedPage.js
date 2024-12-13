import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../../../Config/AxiosConfig';
import CustomAlert from '../../../../Config/CustomAlert';
import ReservationOccupiedList from './ReservationOccupiedList';
import ReservationCheckoutPopup from '../ReservationCheckout/ReservationCheckoutPopup';
import ReservationOrderBill from '../ReservationCheckout/ReservationOrderBill';
import ResTableMap from '../ResTableMap/ResTableMap';

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

  const [isOpenResTableMap,setIsOpenResTableMap] = useState(null);
  const [resTablesByCapaAndCheckinTime,setResTableByCapaAndCheckinTime] = useState([]);
  const [paginationTableState,setPaginationTableState] = useState(
    {
      pageCurrent : 0,
      pageSize : 6,
      sortOrder : 'desc',
      sortBy : 'tableId',
      totalPage : ''
    }
  )
  const handleChangePaginationTableState = async (name, value) => {
    setPaginationTableState(prev => ({
      ...prev,
      [name] : value
    }))
  }
  const handleOpenResTableMap = () => {
    setIsOpenResTableMap(!isOpenResTableMap);
  }

  const sortResTableOptions =  [
    {label : 'table Id', value : 'tableId'},
    {label : 'tableName', value : 'tableName'}
  ]

  const handleCheckResTableByCapacityAndCheckinTime = async (capacity) => {
    try {
      const resResTableByCapacityAndCheckinTime =  await axiosConfig.get(`/restables/getResTableByCapiAndCheckinTime/${capacity}`, {
        params : {
          pageCurrent : paginationTableState.pageCurrent,
          pageSize : paginationTableState.pageSize,
          sortOrder : paginationTableState.sortOrder,
          sortBy : paginationTableState.sortBy
        }
      });
     // console.log(resResTableByCapacityAndCheckinTime.data.data);
      handleChangePaginationTableState('totalPage',resResTableByCapacityAndCheckinTime.data.data.totalPages);
      setResTableByCapaAndCheckinTime(resResTableByCapacityAndCheckinTime.data.data.content);
    } catch (error) {
      console.error('error in handleCheckResTableByCapacityAndCheckinTime ' , error);
    }
  }

  const handleChangeTable = async (reservationOrderId, resTableId) => {
    if(!reservationOrderId ){
      setAlert({type : 'error', message : 'Change Table Failed!'});
    }
    console.log(reservationOrderId,resTableId);
    try {
      const resReservationOrderChangeTable = await axiosConfig.get(`/reservationOrder/changeTable/${reservationOrderId}/${resTableId}`);
      console.log(resReservationOrderChangeTable.data.data);
      if(resReservationOrderChangeTable.data.data !== null){
        setAlert({type : 'success', message  : 'Change Table Success'});
        fetchReservationById();
        handleOpenResTableMap();
      }else {
        setAlert({type : 'error', message : 'Change Table Failed!'});
      }
    } catch (error) {
      console.error('error in handleChangeTable',error);
    }
  }

  const navigate = useNavigate();
  const [paginationState,setPaginationState] = useState({
    pageCurrent : 0,
    pageSize : 4,
    sortOrder : 'desc',
    sortBy : 'foodId',
    totalPage : '', 
    startDate : '', 
    endDate : '', 
    keyWord : ''
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
        handleFoodOrderItemChange(food.foodId, 1);
      }
     // console.log(foodIdSelected);
  }
  const handleFoodOrderItemChange =  (foodId, quantity) => {
  //  console.log(foodId);
    //console.log(quantity);
      setFoodOrderItem((prevOrderItem ) => ({
        ...prevOrderItem,
        [foodId] : quantity
      })) 
  }

  const handleReservationOrder = async ()  => {
  //  console.log(foodOrderItem);
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

  const handleCheckoutReservationOrder = async (paymentMethodId, totalAmount) => {
    const reservationOrderId = reservationOrder.reservationOrderId;
   // console.log(reservationOrder.reservationOrderId);
    console.log(paymentMethodId);
    //console.log(baseUrlReturn);
    try {
      const resCheckOutReservationOrder = await axiosConfig.get(`/paymentMethod/payment/${reservationOrderId}/${totalAmount}`, {
        params : {
          paymentMethodId : paymentMethodId, 
          baseUrlReturn : baseUrlReturn ,
          userName : userName
        }
      })
      // console.log(resCheckOutReservationOrder.data.data);
       
      console.log(resCheckOutReservationOrder.data.data);
      if(resCheckOutReservationOrder.data.data !== null){
        setAlert({type : 'success' , message : 'Checkout Success'});
        if(paymentMethodId === 5){
         setTimeout(() => {
          navigate(`/thanks/reser/${resCheckOutReservationOrder.data.data.reservationOrderPaymentId}`);
         },2000)
        }else if(paymentMethodId !== 5 && resCheckOutReservationOrder.data.data !== null){
          window.location.href = resCheckOutReservationOrder.data.data;
         }
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
    //  console.log(resReservationById.data.data);
      setReservationById(resReservationById.data.data);
    } catch (error) {
      console.error('error  in fetchReservationById',error);
    }
  }
  const fetchPaymentMethod = async () => {
    try {
      const resPaymentMethods = await axiosConfig.get(`/payment/getAll`);
   //   console.log(resPaymentMethods);
      setPaymentMethod(resPaymentMethods.data.data);
    } catch (error) {
      console.error('error in fetchPaymentMethod ' + error);
    }
  }
  const handleOpenCheckoutPopup =  async( ) => {
    setIsOpentCheckoutPopup(!isOpentCheckoutPopup);
  }
  const fetchFoods = async () => {
    console.log(paginationState);
    try {
      const resGetAllFood = await axiosConfig.get(`/user/food/getAllFoodByHuong`,{
        params : {
          pageCurrent : paginationState.pageCurrent,
          pageSize : paginationState.pageSize, 
          sortOrder : paginationState.sortOrder,
          sortBy : paginationState.sortBy, 
          keyWord : paginationState.keyWord,
          startDate : paginationState.startDate,
          endDate : paginationState.endDate
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
     // console.log(resReservaionOrderByReservationId.data.data);
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
  },[reservationId , ...Object.values(paginationState), ...Object.values(paginationTableState) ])
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
              handleOpenResTableMap = {handleOpenResTableMap}
              />
              {/* <ReservationCheckoutPopup
                isOpentCheckoutPopup={isOpentCheckoutPopup}
                paymentMethod={paymentMethod}
                reservationOrder={reservationOrder}
                handleCheckoutReservationOrder = {handleCheckoutReservationOrder}
                handleOpenCheckoutPopup = {handleOpenCheckoutPopup}
               /> */}
               <ReservationOrderBill
                isOpentCheckoutPopup={isOpentCheckoutPopup}
                handleOpenCheckoutPopup = {handleOpenCheckoutPopup}
                paymentMethod={paymentMethod}
                reservationOrder={reservationOrder}
                handleCheckoutReservationOrder = {handleCheckoutReservationOrder}
                 />
                 <ResTableMap 
                  isOpenResTableMap={isOpenResTableMap}
                  handleOpenResTableMap = {handleOpenResTableMap}
                  handleCheckResTableByCapacityAndCheckinTime = {handleCheckResTableByCapacityAndCheckinTime}
                  resTablesByCapaAndCheckinTime = {resTablesByCapaAndCheckinTime}
                  paginationTableState = {paginationTableState}
                  handleChangePaginationTableState = {handleChangePaginationTableState}
                  sortResTableOptions = {sortResTableOptions}
                  handleChangeTable = {handleChangeTable}
                  reservationOrder={reservationOrder}
                 />
        </>
    );
};

export default ReservationOccupiedPage;