import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../../Config/AxiosConfig';
import CustomAlert from '../../../../Config/CustomAlert';
import ReservationOccupiedList from './ReservationOccupiedList';

const ReservationOccupiedPage = () => {
  const {reservationId} = useParams();
  const [alert ,setAlert] = useState(null);
  const [reservationById , setReservationById] = useState();
  const [foods,setFoods] = useState([]);
  const [foodIdSelected,setFoodIdSelected] = useState([]);
  const [foodOrderItem ,setFoodOrderItem] = useState({});
  const [reservationOrder,setReservationOrder] = useState();
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
        setAlert({type : 'success', message : 'Order Food Success'});
      }else{
        setAlert({type : 'erorr' , message : 'Order Food Faild'});
      }
      fetchReservaionOrderByReservationId();
    } catch (error) {
      console.error('erorr in handleReservationOrder',error)
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
      console.log(resGetAllFood.data.data);
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
  },[reservationId , ...Object.values(paginationState)])
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
              />
        </>
    );
};

export default ReservationOccupiedPage;