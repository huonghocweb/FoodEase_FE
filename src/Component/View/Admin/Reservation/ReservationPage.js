import React, { useEffect, useState } from "react";
import { customTranslate } from "../../../../i18n";
import CustomAlert from "../../../Config/CustomAlert";
import axiosConfig from "./../../../Config/AxiosConfig";
import CheckinForm from "./CheckinForm";
import ReservationList from "./ReservationList";

const ReservationPage = () => {
  const [isOpenCheckinForm, setIsOpenCheckinForm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [reservationById, setReservationById] = useState();
  const [reservations, setReservations] = useState([]);
  const [paginationState, setPaginationState] = useState({
    pageCurrent: 0,
    pageSize: 4,
    sortOrder: "desc",
    sortBy: "reservationId",
    totalPage: 0,
    startDate: "",
    endDate: "",
    keyWord: "",
  });
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

  const handleCheckinReservation = async (reservationId, checkinCode) => {
    console.log(reservationId);
    console.log(checkinCode);
    try {
      const resCheckInReservation = await axiosConfig.get(
        `/reservation/checkinReservation/${reservationId}/${checkinCode}`
      );
      console.log(resCheckInReservation.data.data);
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
      }
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
  }, [...Object.values(paginationState)]);
  return (
    <>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
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
      />
    </>
  );
};

export default ReservationPage;
