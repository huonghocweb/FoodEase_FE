import React, { useEffect, useRef, useState } from 'react';
 import {useParams} from 'react-router-dom';
 import axiosConfig from '../../../Config/AxiosConfig';
import ReservationOrderPaymentDetailsPopup from '../../Admin/ReservationOrderPayment/ReservationOrderPaymentDetailsPopup';

const ThanksReser = () => {

  const [paymentInfo, setPaymentInfo] = useState({});
  const [reservationOrderPayment, setReservationOrderPayment] = useState(null);
  const [isOpenReservationOrderDetailsPopup ,setIsOpenReservationOrderDetailsPopup] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const urlParams = new URLSearchParams(window.location.search);
    let resPaymentInfo;

    const fetchPaymentInfo = async () => {
        console.log(urlParams);
      try {
        const params = Object.fromEntries(urlParams.entries());
                resPaymentInfo = await axiosConfig.get(
            "/paymentMethod/byPaypal/getPaymentInfoReser",
            { params, signal: controller.signal }
          );
          console.log(resPaymentInfo.data);
        console.log(resPaymentInfo?.data.data);
        if(resPaymentInfo?.data){
            setReservationOrderPayment(resPaymentInfo?.data.data);
        }else {
            setReservationOrderPayment(0);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching payment info:", error);
        }
      }
    };

    fetchPaymentInfo();

    return () => controller.abort();
  }, []);


    return (
        <>
          <ReservationOrderPaymentDetailsPopup 
            isOpenReservationOrderDetailsPopup={isOpenReservationOrderDetailsPopup}
            setIsOpenReservationOrderDetailsPopup={setIsOpenReservationOrderDetailsPopup}
            reservationOrderPaymentById={reservationOrderPayment}
          />

            <div id="thanksPage">
        <div className="thanks-container">
          <div
            className={`thanks-status-icon ${
              reservationOrderPayment
                ? "thanks-success"
                : reservationOrderPayment === null
                ? "thanks-loading"
                : "thanks-error"
            }`}
          >
            {reservationOrderPayment ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="150px"
                height="150px"
              >
                <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm6.927 8.2-6.845 9.289a1.011 1.011 0 0 1-1.43.188L5.764 13.769a1 1 0 0 1 1.25-1.562l4.076 3.261 6.227-8.451a1 1 0 1 1 1.61 1.183z" />
              </svg>
            ) : reservationOrderPayment === null ? (


                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="150px"
                height="150px"
                fill="none"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray="31.4 31.4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    repeatCount="indefinite"
                    dur="1s"
                    keyTimes="0;1"
                    values="0 25 25;360 25 25"
                  />
                </circle>
              </svg>
             
            ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="150px"
                height="150px"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 13.707a1 1 0 0 1-1.414 0L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 1 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1 0 1.414z" />
              </svg>

            )}
          </div>
          <h3 className="thanks-status-text">
            {reservationOrderPayment
              ? "Payment Success!"
              : reservationOrderPayment === null
              ?  "Loading..."
              : "Payment Failed!"}
          </h3>
          <div className="thanks-button">
            <button
              onClick={() => setIsOpenReservationOrderDetailsPopup(true)}
            >
              See Order
            </button>
          </div>
          <div className="thanks-details">
            <p>
              <strong>Order Info:</strong> {reservationOrderPayment?.reservationOrderPaymentId || "No data"}
            </p>
            <p>
              <strong>Transaction Id:</strong>{" "}
              {reservationOrderPayment?.transactionId || "No data"}
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {reservationOrderPayment?.totalAmount
                ? Number(reservationOrderPayment.totalAmount).toLocaleString("vi-VN") + " VNĐ"
                : "No data"}
            </p>
            <p>
              <strong>Payment DateTime:</strong>{" "}
              {new Date(reservationOrderPayment?.paymentDateTime).toLocaleDateString('vi')}
            </p>
          </div>
          <div className="thanks-footer">
            Thank you for shopping with us!
          </div>
        </div>
      </div>
        </>
    );
};

export default ThanksReser;