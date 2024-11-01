import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../../Config/AxiosConfig';
import ReservationOccupiedList from './ReservationOccupiedList';
import { Label } from 'recharts';

const ReservationOccupiedPage = () => {
  const {reservationId} = useParams();
  const [reservationById , setReservationById] = useState();
  const [foods,setFoods] = useState([]);
  const [foodIdSelected,setFoodIdSelected] = useState([]);
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
        setFoodIdSelected(foodIdSelected.filter(item => item !== food));
      }else{
        setFoodIdSelected([...foodIdSelected,food]);
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
  const sortOptions = [
    {value : 'foodId' , label : 'Food ID'},
    {value : 'foodName' , label : 'Food Name'},
    {value : 'basePrice' , label : 'Base Price '},
    {value : 'discount' , label : 'Discount  '},
  ]
  useEffect(() => {
    fetchReservationById();
    fetchFoods ();
  },[reservationId , ...Object.values(paginationState)])
    return (
        <>
             <ReservationOccupiedList
              reservationById={reservationById}
              foods = {foods}
              paginationState ={ paginationState}
              handlePaginationChange = {handlePaginationChange}
              sortOptions = {sortOptions}
              />
        </>
    );
};

export default ReservationOccupiedPage;