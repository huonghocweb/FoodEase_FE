import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import axiosConfig from "../../../Config/AxiosConfig";
import "./Thanks.css";
import OrderDetailsPopup from "../MyOrder/OrderDetailsPopup";

const Thanks = () => {
  const [paymentInfo, setPaymentInfo] = useState({});
  const { paymentmethod } = useParams();
  const [orderById, setOrderById] = useState();
  const [isOpenDetails,setIsOpenDetails] = useState(null);

  const handleGetOrderById = async (orderId) => {
    console.log(orderId);
    try {
      const response = await axiosConfig.get(`/order/byId/${orderId}`);
      console.log(response.data.data);
      setOrderById(response.data.data);
      handleOpenDetails();
    } catch (error) {
      console.error('error in get Order By Id',error);
    }
  }

  const handleOpenDetails = () => {
    setIsOpenDetails(!isOpenDetails);
  }

  useEffect(() => {
    const controller = new AbortController(); // Tạo một AbortController
    // Lấy toàn bộ đường dẫn được trả về từ trang thanh toán
    const urlParams = new URLSearchParams(window.location.search);
    let resPaymentInfo;
    console.log(paymentmethod);
    const fetchPaymentInfo = async () => {
      try {
        // Nếu có vnp_OrderInfo tồn tại trong url thì call đến hàm xử lý của vnPay
        if (paymentmethod === "vnpay") {
          const params = Object.fromEntries(urlParams.entries());
          resPaymentInfo = await axiosConfig.get(
            "/payment/byVnpay/getPaymentInfo",
            {
              params,
              signal: controller.signal, // Thêm signal vào cấu hình yêu cầu
            }
          );
          // Nếu có paymentId tồn tại thì call đến hàm xử lý của paypal
        } else if (paymentmethod === "paypal") {
          const params = Object.fromEntries(urlParams.entries());
          resPaymentInfo = await axiosConfig.get(
            "/payment/byPaypal/getPaymentInfo",
            {
              params,
              signal: controller.signal, // Thêm signal vào cấu hình yêu cầu
            }
          );
        } else if (paymentmethod === "stripe") {
          const params = Object.fromEntries(urlParams.entries());
          resPaymentInfo = await axiosConfig.get(
            "/payment/byStripe/getPaymentInfo",
            {
              params,
              signal: controller.signal, // Thêm signal vào cấu hình yêu cầu
            }
          );
        } else if (paymentmethod === "momo") {
          const params = Object.fromEntries(urlParams.entries());
          resPaymentInfo = await axiosConfig.get(
            "/payment/byMomo/getPaymentInfo",
            {
              params,
              signal: controller.signal, // Thêm signal vào cấu hình yêu cầu
            }
          );
          console.log(resPaymentInfo?.data);
        }
        setPaymentInfo(resPaymentInfo?.data.data);
        console.log(resPaymentInfo?.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error); // Bỏ qua lỗi nếu yêu cầu bị hủy
        }
      }
    };

    fetchPaymentInfo();

    return () => controller.abort(); // Hủy yêu cầu khi component unmount
  }, [paymentmethod]);

  return (
    <>
    <OrderDetailsPopup 
      handleOpenOrderDetailsPopup={handleOpenDetails}
      isOpenOrderDetails={isOpenDetails}
      orderByOrderId={orderById}
    />
      <div id="thanksPage">
        <div className="row" style={{ marginTop: "250px" }}>
          <div class="bg-gray-100 h-screen">
            {paymentInfo &&
              (paymentInfo?.paymentStatus === 1 ? (
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "200px", color: "green" }}
                >
                  <path
                    fill="currentColor"
                    d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                  ></path>
                </svg>
              ) : paymentInfo?.paymentStatus === 0 ? (
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "200px", color: "red" }}
                >
                  <path
                    fill="currentColor"
                    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 13.707a1 1 0 0 1-1.414 0L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1 0 1.414z"
                  ></path>
                </svg>
              ) : (
                <svg
                  style={{ width: "150px", height: "150px", color: "gray" }}
                  viewBox="0 0 50 50"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
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
              ))}

            {paymentInfo && (
              <div class="text-center">
                <h3 class="md:text-2xl text-base text-gray-900 font-semibold text-center">
                  {paymentInfo.paymentStatus === 1
                    ? "Payment Success !"
                    : paymentInfo.paymentStatus === 0
                    ? "Payment Failed !"
                    : "Loadding..."}
                </h3>
                <div>
                  <button
                    onClick={() => handleGetOrderById(paymentInfo?.orderInfo)}
                    className="btn btn-success"
                    style={{ borderRadius: "15px" }}
                  >
                    See Order
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="row" style={{ marginTop: "50px" }}>
            <p>
              <strong>{customTranslate("Order Info")}:</strong>{" "}
              {paymentInfo?.orderInfo || customTranslate("No data")}
            </p>
            <p>
              <strong>{customTranslate("Transaction Id")}:</strong>{" "}
              {paymentInfo?.transactionId || customTranslate("No data")}
            </p>
            <p>
              <strong>{customTranslate("Total Price")}:</strong>{" "}
              {paymentInfo?.totalPrice
                ? Number(paymentInfo.totalPrice).toLocaleString("vi-VN") +
                  " VNĐ"
                : customTranslate("No data")}
            </p>
            <p>
              <strong>{customTranslate("Payment DateTime")}:</strong>{" "}
              {paymentInfo?.paymentDateTime || customTranslate("No data")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thanks;
