import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import AddressFormPopup from './AddressFormPopup';
import MyDeliveryAddressList from './MyDeliveryAddressList';
import CustomAlert  from './../../../Config/CustomAlert';

const MyDeliveryAddressPage = () => {
  const [isOpenAddressPopup,setIsOpenAddressPopup] = useState(null);
  const {register,handleSubmit,reset,formState : {errors}} = useForm({  });
  const [alert ,setAlert] = useState(null);
  const [deliveryAddress,setDeliveryAddress] = useState([]);
  const [provinces ,setProvinces] = useState([]);
  const [districts,setDistricts] = useState([]);
  const [wards,setWards] = useState([]);
  const {userName} = useParams();
  const [dataEdit,setDataEdit] = useState();
  const [paginationState ,setPaginationState] = useState({
    pageCurrent : 0,
    pageSize :4,
    sortOrder : 'asc',
    sortBy : 'deliveryAddressId',
    totalPage : ''
  })
  const handlePaginationChange = async(name,value) => {
    setPaginationState (prevState => ({
      ...prevState, 
      [name] :value
    }))
  }
  const handleDeliveryAddressForm = async(data)=> {
    console.log(data);
    const userId = localStorage.getItem('userIdLogin');
    const provinceChoosed = provinces.find(item => item.ProvinceID=== Number(data.provinceId));
    const districtChoosed = districts.find(item => item.DistrictID=== Number(data.districtId));
    const wardChoosed = wards.find(item => item.WardCode=== data.wardCode);
    const fullAddress = `${data.houseNumber} ${wardChoosed?.WardName} ${districtChoosed?.DistrictName} - ${provinceChoosed?.ProvinceName}`  ;
    console.log(fullAddress);
    const formData = new FormData();
    const payload = {
      ...data,
      userId,
      fullAddress : fullAddress
    }
    formData.append('deliveryAddressRequest', new Blob([JSON.stringify(payload)], {type:'application/json'}));
    try {
      let resCreateDeliveryAddress  ;
      if(dataEdit){
        resCreateDeliveryAddress = await axiosConfig.put(`/deliveryAddress/${dataEdit.deliveryAddressId}`,formData);
        if(resCreateDeliveryAddress.data.data !== null){
          setAlert({type : 'success' , message : 'Create Delivery Address Success !'});
        }else{
          setAlert({type : 'error' , message : 'Create Delivery Addres Failed!'});
        }
      }else{
         resCreateDeliveryAddress = await axiosConfig.post(`/deliveryAddress`,formData);
         if(resCreateDeliveryAddress.data.data !== null){
          setAlert({type : 'success' , message : 'Update  Delivery Address Success !'});
        }else{
          setAlert({type : 'error' , message : 'Update Delivery Addres Failed!'});
        }
      }
      handleCloesPopup();
      fetchDeliveryAddress();
    } catch (error) {
      console.error('error in handleDeliveryAddressForm',error);
    }
  }

  const handleDeleteDeliveryAddress = async (deliveryAddressId) => {
    try {
      const resDeleteDeliveryAddressById = await axiosConfig.delete(`/deliveryAddress/${deliveryAddressId}`);
      if(resDeleteDeliveryAddressById.data.data !== null){
        setAlert({type : 'success' , message : 'Delete  Delivery Address Success !'});
      }else{
        setAlert({type : 'error' , message : 'Delete Delivery Addres Failed!'});
      }
      fetchDeliveryAddress();
    } catch (error) {
      console.error('error in handleDeleteDeliveryAddress ',error);
    }
  }
  const fetchDeliveryAddress = async () => {
    try {
      const resDeliveryAddressByUserName = await axiosConfig.get(`/deliveryAddress/getByUserName/${userName}`,{
        params : {
          pageCurrent : paginationState.pageCurrent ,
          pageSize : paginationState.pageSize , 
          sortOrder : paginationState.sortOrder,
          sortBy : paginationState.sortBy
        }
      })
      console.log(resDeliveryAddressByUserName.data.data);
      setDeliveryAddress(resDeliveryAddressByUserName.data.data.content);
      handlePaginationChange('totalPage',resDeliveryAddressByUserName.data.data.totalPages);
    } catch (error) {
      console.error('error in fetch DeliveryAddress',error);
    }
  }
  const handleCloesPopup =  ()=> {
    setIsOpenAddressPopup(false);
    reset({
      deliveryAddressName: '',
      phoneAddress: '',
      provinceId: '',
      districtId: '',
      wardCode : '',
      fullAddress : '',
      houseNumber : ''
    });
  setDataEdit(null);
  }
  const fetchDeliveryAddressById = async (deliveryAddressId) => {
    setIsOpenAddressPopup(true);
    try {
      const resDeliveryAddressById = await axiosConfig.get(`/deliveryAddress/getById/${deliveryAddressId}`);
      const deliveryAddressByIdData = resDeliveryAddressById.data.data;
      console.log(deliveryAddressByIdData.provinceId);
      await handleGetDistrictByProvinceId(deliveryAddressByIdData.provinceId);
     await handleGetWardByDistrictId(deliveryAddressByIdData.districtId);
     setDataEdit(deliveryAddressByIdData);
     resetFormValue(deliveryAddressByIdData);
    } catch (error) {
      console.log('error in fetchDeliveryAddressById ', error);
    }
  }

  const resetFormValue =  (deliveryAddressByIdData) => {
    reset({
      deliveryAddressId : deliveryAddressByIdData.deliveryAddressId,
      deliveryAddressName : deliveryAddressByIdData.deliveryAddressName,
      provinceId : deliveryAddressByIdData.provinceId,
      districtId : deliveryAddressByIdData.districtId,
      wardCode : deliveryAddressByIdData.wardCode,
      houseNumber : deliveryAddressByIdData.houseNumber, 
      phoneAddress : deliveryAddressByIdData.phoneAddress, 
      fullAddress : deliveryAddressByIdData.fullAddress , 
      status : deliveryAddressByIdData.status
    })
  }
  const fetchProvinces = async () => {
    try {
      const resProvinces  = await axiosConfig.post(`/ship/getProvince`);
      const provinceData = JSON.parse(resProvinces.data.data);
      setProvinces(provinceData.data);
    } catch (error) {
      console.error('error in fetch Provices',error);
    }
  }
  const handleGetDistrictByProvinceId = async (provinceId) => {
    console.log(provinceId);
    try {
      const resDistrictsByProvince = await axiosConfig.post(`/ship/getDistrict/${provinceId}`);
      const districtsData = JSON.parse(resDistrictsByProvince.data.data);
      setDistricts(districtsData.data)
    } catch (error) {
      console.error('error in handleGetDistrictByProvinceId',error);
    }
  }

  const handleGetWardByDistrictId = async(districtId) => {
    try {
      const resWardByDistrict = await axiosConfig.post(`/ship/getWard/${districtId}`);
      const wardsData =JSON.parse(resWardByDistrict.data.data);
      setWards(wardsData.data);
    } catch (error) {
      console.error('error in handleGetWardByDistrictId ',error);
    }
  }
  const sortOptions = [
    {value:'deliveryAddressId',label : 'DeliveryAddress Id'},
    {value:'deliveryAddressName',label : 'DeliveryAddress Name'},
    {value:'provinceId',label : 'Province '},
    {value:'status',label : 'Status'},
  ]
  useEffect(() => {
    fetchDeliveryAddress();
    fetchProvinces();
  },[...Object.values(paginationState),districts,wards])
    return (
        <>
          {
            alert && (
              <CustomAlert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )
          }
          <MyDeliveryAddressList
            deliveryAddress = {deliveryAddress}
            setIsOpenAddressPopup = {setIsOpenAddressPopup}
            paginationState = {paginationState}
            handlePaginationChange = {handlePaginationChange}
            sortOptions = {sortOptions}
            fetchDeliveryAddressById = {fetchDeliveryAddressById}
            handleDeleteDeliveryAddress = {handleDeleteDeliveryAddress}
           />
           <AddressFormPopup
            isOpenAddressPopup = {isOpenAddressPopup}
            handleCloesPopup = {handleCloesPopup}
            handleDeliveryAddressForm = {handleDeliveryAddressForm}
            register = {register}
            handleSubmit = {handleSubmit}
            errors = {errors}
            provinces = {provinces}
            districts = {districts}
            wards= {wards}
            handleGetDistrictByProvinceId = {handleGetDistrictByProvinceId}
            handleGetWardByDistrictId = {handleGetWardByDistrictId}
            dataEdit = {dataEdit}
            /> 
        </>
    );
};

export default MyDeliveryAddressPage;