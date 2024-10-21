import React, { useEffect, useState } from 'react';
import './BookTable.css';
import BookTableList from './BookTableList';
import TableAvailablePopup from './TableAvailablePopup';
import { useSSR } from 'react-i18next';
import ServicesPopup from './ServicesPopup';
import axiosConfig from '../../../Config/AxiosConfig';

const BookTablePage = () => {

    const [isOpenTableAvailable,setIsOpentTableAvailable] = useState(false);

    const [isOpenServicesPopup,setIsOpenServicesPopup] = useState(false);
    const [serPageCurrent,setSerPageCurrent] = useState(0);
    const [serPageSize,setSerPageSize] = useState(4);
    const [serSortOrder,setSerSortOrder] = useState("desc");
    const [serSortBy,setSerSortBy] = useState("serviceId");
    const [serTotalPages,setSerToTalPages] = useState(0);
    const [tableServices,setTableServices] = useState([]);
    const [selectedServiceIds,setSelectdServicesIds] = useState([]);
    const handleSerPageCurrent = async (value) => {
        setSerPageCurrent(value);
    }
    const handleSerPageSize = async (value) => {
        setSerPageSize(value);
    }
    const handleSerSortOrder = async (value) => {
        setSerSortOrder(value);
    }
    const handleSerSortBy = async (value) => {
        setSerSortBy(value);
    }
    const handleServicesPopup = async () => {
        setIsOpentTableAvailable(false);
        setIsOpenServicesPopup(!isOpenServicesPopup);
    }
  

    const handleSelectServices = async (servicesId) => {
        console.log(selectedServiceIds);
      if(selectedServiceIds.includes(servicesId)){
          setSelectdServicesIds(selectedServiceIds.filter(id => id !== servicesId));
      }else {
          setSelectdServicesIds([...selectedServiceIds, servicesId]);
      }
    }

    useEffect(() => {
        fecthServices();
    },[serPageCurrent,serPageSize]);

    const fecthServices = async () => {
        try {
            const resAllServices = await axiosConfig.get(`/tableService`,{
                params : {
                    pageCurrent: serPageCurrent ,
                    pageSize : serPageSize , 
                    sortOrder : serSortOrder, 
                    sortBy : serSortBy 
                }
            })
            console.log(resAllServices.data.data.content);
            setTableServices(resAllServices.data.data.content);
            setSerToTalPages(resAllServices.data.data.totalPages);
        } catch (error) {
            console.error('error in fetchServices',error);
        }
    }

    const handleTableAvailablePopup = async () => {
        setIsOpentTableAvailable(!isOpenTableAvailable);
    }
    
    return (
        <>
        <BookTableList
        handleTableAvailablePopup = {handleTableAvailablePopup}
         />
        <TableAvailablePopup
        isOpenTableAvailable = {isOpenTableAvailable}
        handleTableAvailablePopup={handleTableAvailablePopup}
        handleServicesPopup = {handleServicesPopup}
         />
         <ServicesPopup 
            isOpenServicesPopup = {isOpenServicesPopup}
            handleServicesPopup = {handleServicesPopup}
            tableServices = {tableServices}
            serPageCurrent = {serPageCurrent}
            serTotalPages = {serTotalPages}
            handleSerPageCurrent = {handleSerPageCurrent}
            selectedServiceIds = {selectedServiceIds}
            handleSelectServices= {handleSelectServices}
         />
        </>
    );
};

export default BookTablePage;