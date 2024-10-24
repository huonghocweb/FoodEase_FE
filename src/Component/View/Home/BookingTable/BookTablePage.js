import React, { useEffect, useState } from 'react';
import './BookTable.css';
import BookTableList from './BookTableList';
import TableAvailablePopup from './TableAvailablePopup';
import { useSSR } from 'react-i18next';
import ServicesPopup from './ServicesPopup';
import axiosConfig from '../../../Config/AxiosConfig';
import CheckTimePopup from './CheckTimePopup';

const BookTablePage = () => {

    const [yourReservation,setYourReservation] = useState([]);
    const fetchtUserByUserName = async () => {
        const userName = localStorage.getItem('userNameLogin');
        console.log(userName)
        try {
            const resUserByUserName = await axiosConfig.get(`/user/getByUserName/${userName}`);
            console.log(resUserByUserName.data.data);
            const user = resUserByUserName.data.data
            if (user) {
                setFormStateCheckTime(prevState => ({
                    ...prevState,
                    user: user,
                    email: user.email
                }));
            }
        } catch (error) {
            console.error('error in fetchUserBy UserName',error);
        }
    }
    const [formStateCheckTime,setFormStateCheckTime] = useState({
        user : '',
        email : '',
        date : '',
        checkinTime : '',
        checkoutTime :''
    });
    const handleInputChange= (name,value) => {
        setFormStateCheckTime({
            ...formStateCheckTime,
            [name] : value
        });
    }
    const resetFormStateCheckTime =  () => {
        console.log('13')
        console.log(formStateCheckTime);
        setFormStateCheckTime({
            date : '',
            checkinTime : '',
            checkoutTime : ''
        })
        fetchtUserByUserName();
    }


    const [tableCategories,setTableCategories] = useState([]);
    const [selectCapacity,setSelectCapacity] = useState(null);
    const [selectTableCategory,setSelectTableCategory] = useState(null);

    const [tabPageCurrent,setTabPageCurrent] = useState(0);
    const [tabPageSize,setTabPageSize] = useState(4);
    const [tabSortOrder,setTabSortOrder] = useState("asc");
    const [tabSortBy,setTabSortBy] = useState("tableId");
    const [tabToTalPage,setTabToTalPage] = useState(0);
    const [tabResTables,setTabResTables] = useState([]);
    const [totalTab,setToTalTab] = useState(0);

    const handleTabPageCurrent = async (value) => {
        setTabPageCurrent(value);
    }
    const handleTabPageSize = async (value) => {
        setTabPageSize(value);
    }
    const handleTabSortOrder = async (value) => {
        setTabSortOrder(value);
    }
    const handleTabSortBy = async (value) => {
        setTabSortBy(value);
    }

    const [isCheckTimePopup,setIsCheckTimePopup] = useState(false);
    const [reservated,setReservted] = useState([]);
    const [tableIdSelected,setTableIdSelected] = useState();
    const openCheckTimePopup = async (tableId)=> {
        setIsCheckTimePopup(!isCheckTimePopup);
        console.log(tableId);
        setTableIdSelected(tableId);
    }
    const handleCheckTimePopup = async (dateCheckTime) => {
        console.log(dateCheckTime);
        handleInputChange('date',dateCheckTime);
        try {
            const resTableReserved = await axiosConfig.get(`/reservation/getByTableIdAndDate/${tableIdSelected}`,
                {
                    params : {
                        dateCheckTime : dateCheckTime
                    }
                }
            );
            console.log(resTableReserved.data.data);
            setReservted(resTableReserved.data.data)
        } catch (error) {
            console.error('error in CheckTimePopup',error);
        }
    }

    const handleCheckResTableAvailable = async() => {
        console.log(formStateCheckTime);
        try {
            const resCheckResTableVai = await axiosConfig.get(`/restables/checkResTableAvailable`,{
                params : {
                    tableId : tableIdSelected,
                    date : formStateCheckTime.date,
                    checkinTime : formStateCheckTime.checkinTime,
                    checkoutTime : formStateCheckTime.checkoutTime,
                    userId : formStateCheckTime.user.userId
                }
            })
            console.log(resCheckResTableVai.data.data);
        } catch (error) {
            console.error('error in handleCheckResTableAvailable',error);
        }
    }


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
            setTableServices(resAllServices.data.data.content);
            setSerToTalPages(resAllServices.data.data.totalPages);
        } catch (error) {
            console.error('error in fetchServices',error);
        }
    }
    const fetchTableCategories = async () => {
        try {
            const resTableCategories = await axiosConfig.get(`/tablecategories`);
            setTableCategories(resTableCategories.data);
        } catch (error) {
            console.error('error in fetchCategories ' ,error);
        }
    }

    const handleTableAvailablePopup = async () => {
        console.log(selectTableCategory);
        try {
            const resTableByCapaAndCate = await axiosConfig.get(`/restables/getResTableAvailable`,{
                params : {
                    tableCategoryId : selectTableCategory || null,
                    capacity : selectCapacity || null,
                    checkinDate : null,
                    checkinTime : null, 
                    pageCurrent: tabPageCurrent ,
                    pageSize : tabPageSize , 
                    sortOrder : tabSortOrder, 
                    sortBy : tabSortBy 
                }
            })
            console.log(resTableByCapaAndCate.data.data);
            setTabResTables(resTableByCapaAndCate.data.data.content);
            setTabToTalPage(resTableByCapaAndCate.data.data.totalPages);
            setToTalTab(resTableByCapaAndCate.data.data.totalElements);
        } catch (error) {
            console.error('error in hanldeGetTableByCapacityAndCategory',error);
        }
    }
    
    
    useEffect(() => {
        fecthServices();
        fetchTableCategories();
        handleTableAvailablePopup();
        fetchtUserByUserName();
    },[serPageCurrent,serPageSize,tabPageCurrent,tabPageSize]);

    return (
        <>
        <BookTableList
        tableCategories = {tableCategories}
        handleTableAvailablePopup = {handleTableAvailablePopup}
        setSelectCapacity={setSelectCapacity}
        setSelectTableCategory={setSelectTableCategory}
        
         />
        <TableAvailablePopup
        handleServicesPopup = {handleServicesPopup}
        tabToTalPage = {tabToTalPage}
        tabResTables= {tabResTables}
        tabPageCurrent = {tabPageCurrent}
        handleTabPageCurrent ={handleTabPageCurrent}
        totalTab = {totalTab}
        openCheckTimePopup  = {openCheckTimePopup}
         />
         <CheckTimePopup 
            isCheckTimePopup = {isCheckTimePopup}
            handleCheckTimePopup = {handleCheckTimePopup}
            reservated = {reservated}
            openCheckTimePopup = {openCheckTimePopup}
            tableIdSelected = {tableIdSelected}
            formStateCheckTime = {formStateCheckTime}
            handleInputChange = {handleInputChange}
            resetFormStateCheckTime = {resetFormStateCheckTime}
            handleCheckResTableAvailable = {handleCheckResTableAvailable}
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