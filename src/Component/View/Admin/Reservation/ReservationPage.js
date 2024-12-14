import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import CustomAlert from "../../../Config/CustomAlert";
import axiosConfig from "./../../../Config/AxiosConfig";
import CheckinForm from "./CheckinForm";
import ReservationList from "./ReservationList";
import QrScanner from "../../../Config/QrScanner/QrScanner";

const ReservationPage = () => {
  const [isOpenCheckinForm, setIsOpenCheckinForm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [reservationById, setReservationById] = useState();
  const [reservations, setReservations] = useState([]);
  const [qrResult, setQrResult] = useState(null);
  const [paginationState, setPaginationState] = useState({
    pageCurrent: 0,
    pageSize: 8,
    sortOrder: "desc",
    sortBy: "reservationId",
    totalPage: 0,
    startDate: "",
    endDate: "",
    keyWord: "",
  });

  const [showScanner, setShowScanner] = useState(false);
  const handleShowScanner = () => {
    setShowScanner(!showScanner);
  };
  const handleQrScanResult = (result) => {
    setQrResult(result);
    console.log("QR Code result:", result);
    if(result) {
      handleCheckinReservation(result);
    }
  };

  const handlePaginationChange = (name, value) => {
    setPaginationState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleReservationById = async (reservationId) => {
    setIsOpenCheckinForm(true);
    try {
      const resReservationById = await axiosConfig.get(
        `/reservation/${reservationId}`
      );
      console.log(resReservationById.data.data);
      setReservationById(resReservationById.data.data);
    } catch (error) {
      console.error("error in fetchReservationById", error);
    }
  };
  const handleCloseCheckinForm = async () => {
    setIsOpenCheckinForm(null);
  };

  const handleCheckinReservation = async (checkinCode) => {
    console.log(reservationById.reservationId);
    console.log(checkinCode);
    console.log(qrResult);
    try {
      const resCheckInReservation = await axiosConfig.get(
        `/reservation/checkinReservation/${reservationById.reservationId}/${checkinCode}`
      );
      
      if (resCheckInReservation.data.data !== null) {
        setAlert({
          type: "success",
          message: customTranslate("CheckIn Success!"),
        });
        fetchReservations();
        handleCloseCheckinForm();
      } else {
        setAlert({
          type: "error",
          message: customTranslate("CheckIn Fail , please Check Checkin Code!"),
        });
        console.log('checkin failed')
      }
      setTimeout(() => {
        setAlert(null);
      },2000)
      console.log(resCheckInReservation.data.data);
    } catch (error) {
      console.error("error in handleCheckinReservation");
    }
  };
  const fetchReservations = async () => {
    try {
      const resReservations = await axiosConfig.get(`/reservation`, {
        params: {
          pageCurrent: paginationState.pageCurrent,
          pageSize: paginationState.pageSize,
          sortOrder: paginationState.sortOrder,
          sortBy: paginationState.sortBy,
          startDate: paginationState.startDate,
          endDate: paginationState.endDate,
          keyWord: paginationState.keyWord,
        },
      });
      setReservations(resReservations.data.data.content);
      handlePaginationChange("totalPage", resReservations.data.data.totalPages);
    } catch (error) {
      console.error("error in fetchReservations ", error);
    }
  };

  const sortOptions = [
    { value: "reservationId", label: "ReservationId" },
    { value: "totalDeposit", label: "ToTal Deposit" },
    { value: "checkinTime", label: "CheckIn Time" },
    { value: "checkoutTime", label: "Checkout Time" },
    { value: "bookTime", label: "Book Time" },
    { value: "reservationStatus", label: "Reservation Status" },
  ];
  useEffect(() => {
    fetchReservations();
  }, [...Object.values(paginationState) , qrResult , reservations]);
  return (
    <>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      {showScanner &&
       <QrScanner 
        onQrScanResult = {handleQrScanResult}
       />}
      <ReservationList
        paginationState={paginationState}
        handlePaginationChange={handlePaginationChange}
        reservations={reservations}
        sortOptions={sortOptions}
        handleReservationById={handleReservationById}
      />
      <CheckinForm
        isOpenCheckinForm={isOpenCheckinForm}
        handleCloseCheckinForm={handleCloseCheckinForm}
        reservationById={reservationById}
        handleCheckinReservation={handleCheckinReservation}
        handleShowScanner = {handleShowScanner}
      />
    </>
  );
};

export default ReservationPage;
