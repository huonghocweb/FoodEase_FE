import { isAfter, isBefore, isEqual, parse } from "date-fns";
import {useForm} from 'react-hook-form';
import React, { useEffect, useState } from "react";
import axiosConfig from "../../../Config/AxiosConfig";
import CustomAlert from "../../../Config/CustomAlert";
import "./BookTable.css";
import BookTableList from "./BookTableList";
import CheckTimePopup from "./CheckTimePopup";
import ServicesPopup from "./ServicesPopup";
import TableAvailablePopup from "./TableAvailablePopup";

const BookTablePage = () => {

  const {register,reset,handleSubmit ,watch, formState : {errors}} = useForm();
  const [yourReservation, setYourReservation] = useState([]);
  const [alert, setAlert] = useState(null);
  const fetchtUserByUserName = async () => {
    const userName = localStorage.getItem("userNameLogin");
    try {
      const resUserByUserName = await axiosConfig.get(
        `/user/getByUserName/${userName}`
      );
      const user = resUserByUserName.data.data;
      if (user) {
        setFormStateCheckTime((prevState) => ({
          ...prevState,
          user: user,
          email: user.email,
        }));
      }
    } catch (error) {
      console.error("error in fetchUserBy UserName", error);
    }
  };
  const [formStateCheckTime, setFormStateCheckTime] = useState({
    user: "",
    email: "",
    date: "",
    checkinTime: "",
    checkoutTime: "",
  });

  const handleInputChange = (name, value) => {
    setFormStateCheckTime({
      ...formStateCheckTime,
      [name]: value,
    });
  };

  const resetFormStateCheckTime = () => {
    setFormStateCheckTime({
      date: "",
      checkinTime: "",
      checkoutTime: "",
    });
    setErrorCheckTimeState({
      checkinTime: "",
      checkoutTime: "",
      date: "",
    });
    fetchtUserByUserName();
  };

  const [tableCategories, setTableCategories] = useState([]);
  const [selectCapacity, setSelectCapacity] = useState(null);
  const [selectTableCategory, setSelectTableCategory] = useState(null);
  const [tabPageCurrent, setTabPageCurrent] = useState(0);
  const [tabPageSize, setTabPageSize] = useState(4);
  const [tabSortOrder, setTabSortOrder] = useState("asc");
  const [tabSortBy, setTabSortBy] = useState("tableId");
  const [tabToTalPage, setTabToTalPage] = useState(0);
  const [tabResTables, setTabResTables] = useState([]);
  const [totalTab, setToTalTab] = useState(0);

  const handleTabPageCurrent = async (value) => {
    setTabPageCurrent(value);
  };
  const handleTabPageSize = async (value) => {
    setTabPageSize(value);
  };
  const handleTabSortOrder = async (value) => {
    setTabSortOrder(value);
  };
  const handleTabSortBy = async (value) => {
    setTabSortBy(value);
  };

  const [isCheckTimePopup, setIsCheckTimePopup] = useState(false);
  const [reservated, setReservted] = useState([]);
  const [errorCheckTimeState, setErrorCheckTimeState] = useState({
    checkinTime: "",
    checkoutTime: "",
    date: "",
  });
  const handleErrorCheckTime = (name, value) => {
    setErrorCheckTimeState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const [tableIdSelected, setTableIdSelected] = useState();
  const openCheckTimePopup = async (tableId) => {
    setIsCheckTimePopup(!isCheckTimePopup);
    //   console.log(tableId);
    setTableIdSelected(tableId);
  };


  const handleCheckTimePopup = async (dateCheckTime) => {
    console.log(dateCheckTime);
    handleInputChange("date", dateCheckTime);
    try {
      const resTableReserved = await axiosConfig.get(
        `/reservation/getByTableIdAndDate/${tableIdSelected}`,
        {
          params: {
            dateCheckTime: dateCheckTime,
          },
        }
      );
      console.log(resTableReserved.data.data);
      setReservted(resTableReserved.data.data);
    } catch (error) {
      console.error("error in CheckTimePopup", error);
    }
  };


  const handleBookTable = async(data) => {
    console.log(data);
    const formData = new FormData();
    // Thêm các giá trị vào FormData
    formData.append("tableId", tableIdSelected);
    formData.append("date", data.date);
    formData.append("checkinTime", data.checkinTime);
    formData.append("checkoutTime", data.checkoutTime);
    formData.append("userId", formStateCheckTime.user?.userId);
        // Thêm từng serviceId vào FormData
        selectedServiceIds.forEach((item) => {
          formData.append("serviceIds", item.serviceId);
        });
        console.log(formStateCheckTime.user?.userId);
        console.log(tableIdSelected);
    try {
      console.log("Checkin");
      const resCheckResTableVai = await axiosConfig.post(
        `/restables/checkResTableAvailable`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu cho FormData
          },
        }
      );

      console.log(resCheckResTableVai.data.data);
      if (resCheckResTableVai.data.data !== null) {
        setAlert({
          type: "success",
          message: "Book Table successfully, check email",
        });
        openCheckTimePopup();
       // resetFormStateCheckTime();
       reset();
      } else {
        setAlert({ type: "error", message: "Book Table failed!" });
      }
    } catch (error) {
           console.error("error in handleCheckResTableAvailable", error);
    }
  }

  // const handleCheckResTableAvailable = async () => {
  //   const formData = new FormData();
  //   // Thêm các giá trị vào FormData
  //   formData.append("tableId", tableIdSelected);
  //   formData.append("date", formStateCheckTime.date);
  //   formData.append("checkinTime", formStateCheckTime.checkinTime);
  //   formData.append("checkoutTime", formStateCheckTime.checkoutTime);
  //   formData.append("userId", formStateCheckTime.user?.userId);
  //   const startDate = parse(
  //     formStateCheckTime.checkinTime,
  //     "HH:mm",
  //     new Date()
  //   );
  //   const endDate = parse(formStateCheckTime.checkoutTime, "HH:mm", new Date());
  //   const date = parse(formStateCheckTime.date, "yyyy-MM-dd", new Date());
  //   const datenow = new Date();
  //   datenow.setHours(0, 0, 0, 0); // Đặt giờ của datenow về 00:00:00 để so sánh chỉ ngày
  //   console.log(datenow);
    
  //   if (!isAfter(date, datenow) && !isEqual(date, datenow)) {
  //     handleErrorCheckTime("date", "Date must be today or a future date");
  //     return;
  //   }
    
  //   if (isAfter(startDate, endDate)) {
  //     console.log("Check out Time is need Afted checkin Time");
  //     handleErrorCheckTime(
  //       "checkinTime",
  //       "Check Int Time is need Afted checkin Time"
  //     );
  //     handleErrorCheckTime(
  //       "checkoutTime",
  //       "Check out Time is need Afted checkin Time"
  //     );
  //     return;
  //   }
  //   // Thêm từng serviceId vào FormData
  //   selectedServiceIds.forEach((item) => {
  //     formData.append("serviceIds", item.serviceId);
  //   });

  //   try {
  //     console.log("Checkin");
  //     const resCheckResTableVai = await axiosConfig.post(
  //       `/restables/checkResTableAvailable`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data", // Đặt kiểu dữ liệu cho FormData
  //         },
  //       }
  //     );

  //     console.log(resCheckResTableVai.data.data);
  //     if (resCheckResTableVai.data.data !== null) {
  //       setAlert({
  //         type: "success",
  //         message: "Book Table successfully, check email",
  //       });
  //       openCheckTimePopup();
  //       resetFormStateCheckTime();
  //     } else {
  //       setAlert({ type: "error", message: "Book Table failed!" });
  //     }
  //   } catch (error) {
  //     console.error("error in handleCheckResTableAvailable", error);
  //   }
  // };

  const [isOpenServicesPopup, setIsOpenServicesPopup] = useState(false);
  const [serPageCurrent, setSerPageCurrent] = useState(0);
  const [serPageSize, setSerPageSize] = useState(4);
  const [serSortOrder, setSerSortOrder] = useState("desc");
  const [serSortBy, setSerSortBy] = useState("serviceId");
  const [serTotalPages, setSerToTalPages] = useState(0);
  const [tableServices, setTableServices] = useState([]);
  const [selectedServiceIds, setSelectdServicesIds] = useState([]);
  const handleSerPageCurrent = async (value) => {
    setSerPageCurrent(value);
  };
  const handleSerPageSize = async (value) => {
    setSerPageSize(value);
  };
  const handleSerSortOrder = async (value) => {
    setSerSortOrder(value);
  };
  const handleSerSortBy = async (value) => {
    setSerSortBy(value);
  };
  const handleServicesPopup = async () => {
    setIsOpenServicesPopup(!isOpenServicesPopup);
  };

  const handleSelectServices = async (services) => {
    if (selectedServiceIds.includes(services)) {
      setSelectdServicesIds(selectedServiceIds.filter((id) => id !== services));
    } else {
      setSelectdServicesIds([...selectedServiceIds, services]);
    }
  };

  const fecthServices = async () => {
    try {
      const resAllServices = await axiosConfig.get(`/tableService`, {
        params: {
          pageCurrent: serPageCurrent,
          pageSize: serPageSize,
          sortOrder: serSortOrder,
          sortBy: serSortBy,
        },
      });
      setTableServices(resAllServices.data.data.content);
      setSerToTalPages(resAllServices.data.data.totalPages);
    } catch (error) {
      console.error("error in fetchServices", error);
    }
  };
  const fetchTableCategories = async () => {
    try {
      const resTableCategories = await axiosConfig.get(`/tablecategories`);
      setTableCategories(resTableCategories.data);
    } catch (error) {
      console.error("error in fetchCategories ", error);
    }
  };

  const handleTableAvailablePopup = async () => {
    //   console.log(selectTableCategory);
    try {
      const resTableByCapaAndCate = await axiosConfig.get(
        `/restables/getResTableAvailable`,
        {
          params: {
            tableCategoryId: selectTableCategory || null,
            capacity: selectCapacity || null,
            checkinDate: null,
            checkinTime: null,
            pageCurrent: tabPageCurrent,
            pageSize: tabPageSize,
            sortOrder: tabSortOrder,
            sortBy: tabSortBy,
          },
        }
      );
      //  console.log(resTableByCapaAndCate.data.data);
      setTabResTables(resTableByCapaAndCate.data.data?.content);
      setTabToTalPage(resTableByCapaAndCate.data.data?.totalPages);
      setToTalTab(resTableByCapaAndCate.data.data?.totalElements);
    } catch (error) {
      console.error("error in hanldeGetTableByCapacityAndCategory", error);
    }
  };

  useEffect(() => {
    fecthServices();
    fetchTableCategories();
    handleTableAvailablePopup();
    fetchtUserByUserName();
  }, [serPageCurrent, serPageSize, tabPageCurrent, tabPageSize]);

  return (
    <>
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <BookTableList
        tableCategories={tableCategories}
        handleTableAvailablePopup={handleTableAvailablePopup}
        setSelectCapacity={setSelectCapacity}
        setSelectTableCategory={setSelectTableCategory}
      />
      <TableAvailablePopup
        handleServicesPopup={handleServicesPopup}
        tabToTalPage={tabToTalPage}
        tabResTables={tabResTables}
        tabPageCurrent={tabPageCurrent}
        handleTabPageCurrent={handleTabPageCurrent}
        totalTab={totalTab}
        openCheckTimePopup={openCheckTimePopup}
      />
      <CheckTimePopup
        isCheckTimePopup={isCheckTimePopup}
        handleCheckTimePopup={handleCheckTimePopup}
        reservated={reservated}
        openCheckTimePopup={openCheckTimePopup}
        tableIdSelected={tableIdSelected}
        formStateCheckTime={formStateCheckTime}
        handleInputChange={handleInputChange}
        resetFormStateCheckTime={resetFormStateCheckTime}
        // handleCheckResTableAvailable={handleCheckResTableAvailable}
        selectedServiceIds={selectedServiceIds}
        isOpenServicesPopup={isOpenServicesPopup}
        handleServicesPopup={handleServicesPopup}
        errorCheckTimeState={errorCheckTimeState}
        register = {register}
        reset = {reset}
        handleSubmit = {handleSubmit}
        handleBookTable = {handleBookTable}
        errors = {errors}
        watch = {watch}
      />
      <ServicesPopup
        isOpenServicesPopup={isOpenServicesPopup}
        handleServicesPopup={handleServicesPopup}
        tableServices={tableServices}
        serPageCurrent={serPageCurrent}
        serTotalPages={serTotalPages}
        handleSerPageCurrent={handleSerPageCurrent}
        selectedServiceIds={selectedServiceIds}
        handleSelectServices={handleSelectServices}
      />
    </>
  );
};

export default BookTablePage;
