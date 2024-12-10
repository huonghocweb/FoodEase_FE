import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Thanks.css";
import OrderDetailsPopup from "../MyOrder/OrderDetailsPopup";

const Thanks = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const { paymentmethod } = useParams();
  const [orderById, setOrderById] = useState();
  const [isOpenDetails, setIsOpenDetails] = useState(null);

  const handleGetOrderById = async (orderId) => {
    try {
      const response = await axiosConfig.get(`/order/byId/${orderId}`);
      setOrderById(response.data.data);
      handleOpenDetails();
    } catch (error) {
      console.error("Error fetching order by ID:", error);
    }
  };

  const handleOpenDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  };

  useEffect(() => {
    const controller = new AbortController();
    const urlParams = new URLSearchParams(window.location.search);
    let resPaymentInfo;

    const fetchPaymentInfo = async () => {
      try {
        const params = Object.fromEntries(urlParams.entries());
        if (paymentmethod === "vnpay") {
          resPaymentInfo = await axiosConfig.get(
            "/payment/byVnpay/getPaymentInfo",
            { params, signal: controller.signal }
          );
        } else if (paymentmethod === "paypal") {
          resPaymentInfo = await axiosConfig.get(
            "/payment/byPaypal/getPaymentInfo",
            { params, signal: controller.signal }
          );
        } else if (paymentmethod === "stripe") {
          resPaymentInfo = await axiosConfig.get(
            "/payment/byStripe/getPaymentInfo",
            { params, signal: controller.signal }
          );
        } else if (paymentmethod === "momo") {
          resPaymentInfo = await axiosConfig.get(
            "/payment/byMomo/getPaymentInfo",
            { params, signal: controller.signal }
          );
        }
        setPaymentInfo(resPaymentInfo?.data.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching payment info:", error);
        }
      }
    };

    fetchPaymentInfo();

    return () => controller.abort();
  }, [paymentmethod]);

  return (
    <>
      <OrderDetailsPopup
        handleOpenOrderDetailsPopup={handleOpenDetails}
        isOpenOrderDetails={isOpenDetails}
        orderByOrderId={orderById}
      />
      <div id="thanksPage">
        <div className="thanks-container">
          <div
            className={`thanks-status-icon ${
              paymentInfo?.paymentStatus === 1
                ? "thanks-success"
                : paymentInfo?.paymentStatus === 0
                ? "thanks-error"
                : "thanks-loading"
            }`}
          >
            {paymentInfo?.paymentStatus === 1 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="150px"
                height="150px"
              >
                <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm6.927 8.2-6.845 9.289a1.011 1.011 0 0 1-1.43.188L5.764 13.769a1 1 0 0 1 1.25-1.562l4.076 3.261 6.227-8.451a1 1 0 1 1 1.61 1.183z" />
              </svg>
            ) : paymentInfo?.paymentStatus === 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="150px"
                height="150px"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 13.707a1 1 0 0 1-1.414 0L12 13.414l-3.293 3.293a1 1 0 1 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 1 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1 0 1.414z" />
              </svg>
            ) : (
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

            )}
          </div>
          <h3 className="thanks-status-text">
            {paymentInfo?.paymentStatus === 1
              ? "Payment Success!"
              : paymentInfo?.paymentStatus === 0
              ? "Payment Failed!"
              : "Loading..."}
          </h3>
          <div className="thanks-button">
            <button
              onClick={() => handleGetOrderById(paymentInfo?.orderInfo)}
            >
              See Order
            </button>
          </div>
          <div className="thanks-details">
            <p>
              <strong>Order Info:</strong> {paymentInfo?.orderInfo || "No data"}
            </p>
            <p>
              <strong>Transaction Id:</strong>{" "}
              {paymentInfo?.transactionId || "No data"}
            </p>
            <p>
              <strong>Total Price:</strong>{" "}
              {paymentInfo?.totalPrice
                ? Number(paymentInfo.totalPrice).toLocaleString("vi-VN") + " VNĐ"
                : "No data"}
            </p>
            <p>
              <strong>Payment DateTime:</strong>{" "}
              {new Date(paymentInfo?.paymentDateTime).toLocaleDateString('vi')}
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

export default Thanks;
