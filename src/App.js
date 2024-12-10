import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Include/Home/Footer";
import Header from "./Component/Include/Home/Header";
import AdminLayOut from "./Component/View/Admin/AdminLayOut";
import BlogForm from "./Component/View/Admin/Blog/BlogForm.js";
import BlogList from "./Component/View/Admin/Blog/BlogList.js";
import CouponFormPage from "./Component/View/Admin/Coupon/CouponFormPage";
import CouponPage from "./Component/View/Admin/Coupon/CouponPage";
import DeliveryTimeEstimator from './Component/View/Admin/Delivery/DeliveryTimeEstimator';
import Inventory from "./Component/View/Admin/Inventory/Inventory.js";
import Notification from "./Component/View/Admin/Notification/Notification";
import PaymentReport from "./Component/View/Admin/PaymentReport/PaymentReport.js";
import AddFood from './Component/View/Admin/Product/AddFood.js';
import FoodPage from "./Component/View/Admin/Product/FoodPage";
import ReservationOccupiedPage from "./Component/View/Admin/Reservation/ReservationChecked/ReservationOccupiedPage.js";
import ReservationPage from "./Component/View/Admin/Reservation/ReservationPage.js";
import ReservationOrderPaymentPage from './Component/View/Admin/ReservationOrderPayment/ReservationOrderPaymentPage.js';
import ResTableForm from "./Component/View/Admin/ResTable/ResTableForm.js";
import ResTableList from "./Component/View/Admin/ResTable/ResTableList.js";
import Revenue from "./Component/View/Admin/Revenue/Revenue";
import FoodReviewTable from './Component/View/Admin/Review/FoodReviewTable';
import ServiceForm from "./Component/View/Admin/Service/ServiceForm.js";
import ServiceList from "./Component/View/Admin/Service/ServiceList.js";
import UserEdit from "./Component/View/Admin/User/UserEdit"; // Đảm bảo đường dẫn đúng
import UserFormPage from "./Component/View/Admin/User/UserFormPage.js";
import UserPage from "./Component/View/Admin/User/UserPage";
import UserOrder from "./Component/View/Admin/UserBuy/UserOrder.js";
import BlogDetail from "./Component/View/Home/BlogEntries/BlogDetail.js";
import BlogEntries from "./Component/View/Home/BlogEntries/BlogEntries.js";
import BookTablePage from "./Component/View/Home/BookingTable/BookTablePage.js";
import CartPage from "./Component/View/Home/Cart/CartPage";
import ClaimCouponPage from "./Component/View/Home/CouponStorage/ClaimCouponPage";
import CouponStoragePage from "./Component/View/Home/CouponStorage/CouponStoragePage";
import FoodDetails from "./Component/View/Home/Details/FoodDetails";
import Order from "./Component/View/Home/Details/Order";
import HomeLayOut from "./Component/View/Home/HomeLayOut";
import FoodIndex from "./Component/View/Home/Index/FoodIndex";
import ConfirmCode from './Component/View/Home/Login/ConfirmCode';
import CreateAccount from './Component/View/Home/Login/CreateAccount';
import CreateUser from './Component/View/Home/Login/CreateUser';
import Login from "./Component/View/Home/Login/Login";
import OAuthRedirect from './Component/View/Home/Login/OAuthRedirect.js';
import ResetPass from './Component/View/Home/Login/ResetPass';
import SetNewPassword from './Component/View/Home/Login/SetNewPassword';
import MyDeliveryAddressPage from "./Component/View/Home/MyDeliveryAddrress/MyDeliveryAddressPage.js";
import OrderStatus from "./Component/View/Home/MyOrder/OrderStatus";
import MyReservationPage from "./Component/View/Home/MyReservation/MyReservationPage.js";
import OrderHistoryPage from "./Component/View/Home/OrderHistory/OrderHistoryPage";
import Thanks from "./Component/View/Home/Thank/Thanks";
import WishList from "./Component/View/Home/WishList/WishList.js";
import FoodBuyMost from './Component/View/Admin/FoodBuyMost/foodBuyMost.js';
import FoodRating from './Component/View/Admin/FoodRating/FoodRating.js';
import "./i18n";
import OrderPage from "./Component/View/Admin/Order/OrderPage";
import ThanksReser from './Component/View/Home/Thank/ThanksReser.js';
function App() {

  useEffect(() => {
    if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeLayOut />}>
            <Route index element={<FoodIndex />} />
            <Route path="login" element={<Login />} />
            <Route path="/oauth2/redirect" element={<OAuthRedirect />} />
            <Route path="/reset-password" element={<ResetPass />} />
            <Route path="/set-new-password" element={<SetNewPassword />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/confirm-code" element={<ConfirmCode />} />
            <Route path="/create-user" element={<CreateUser />} />
            
            <Route path="notification" element={<Notification />} />
            <Route path="foodDetailsPopup" element={<Order />} />
            <Route path="foodDetails/:id" element={<FoodDetails />} />
            <Route path="WishList/foodDetails/:id" element={<FoodDetails />} />
            <Route path="cart/:cartId" element={<CartPage />} />
            <Route path="/thanks/:paymentmethod" element={<Thanks />} />
            <Route path="couponStorage" element={<CouponStoragePage />} />
            <Route path="WishList" element={<WishList />} />
            <Route path='claimCoupon' element={<ClaimCouponPage />} />
            <Route path='orderHistory/order/:userName' element={<OrderHistoryPage />} />
            <Route path='/myOrder' element={<OrderStatus/>} />
            <Route path='/bookTable' element={<BookTablePage />} />
            <Route path="wishlist/:wishListId" element={<WishList />} />
            <Route path="claimCoupon" element={<ClaimCouponPage />} />
            <Route path='myReservation/:userName' element = {<MyReservationPage/>} />
            <Route path='mydAddress/:userName' element={<MyDeliveryAddressPage />} />
            {/* chánh */}
            <Route path="blog" element={<BlogEntries />} />
            <Route path="blog/:blogId" element={<BlogDetail />} />
            {/* chánh */}
            <Route
              path="orderHistory/order/:userName"
              element={<OrderHistoryPage />}
            />
            <Route path="/myOrder" element={<OrderStatus />} />
            <Route path='thanks/reser/:paymentMethodId' element={ <ThanksReser/>} />
          </Route>

          <Route path="/admin"  element={<AdminLayOut />}>
                 <Route index element={<OrderPage />} />
            <Route path="review"  element ={<FoodReviewTable />} />
            <Route path="delivery" element ={<DeliveryTimeEstimator />} />
            <Route path="users" element={<UserPage />} />
            <Route path="user/create" element={<UserFormPage />} />
            <Route path="user/edit/:userId" element={<UserEdit />} />
            <Route path="foods" element={<FoodPage />} />
            <Route path="coupons" element={<CouponPage />} />
            <Route path="coupon/create" element={<CouponFormPage />} />
            <Route path='reservation' element ={<ReservationPage/>} />
            <Route path='reservationOccupied/:reservationId' element={<ReservationOccupiedPage/>} />
            <Route
              path="coupon/update/:couponId"
              element={<CouponFormPage />}
            />
            <Route path='reservationOrderPayment' element={<ReservationOrderPaymentPage/>} />
            <Route
              path="coupon/update/:couponId"
              element={<CouponFormPage />}
            />
            {/* Chanh */}
            <Route path="resTableList" element={<ResTableList />} />
            <Route path="tables/new" element={<ResTableForm />} />
            <Route path="tables/edit/:tableId" element={<ResTableForm />} />
            <Route path="services" element={<ServiceList />} />
            <Route path="tableService/new" element={<ServiceForm />} />
            <Route path="tableService/edit/:serviceId" element={<ServiceForm />} />
            <Route path="BlogList" element={<BlogList />} />
            <Route path="blog/new" element={<BlogForm />} />
            <Route path="blog/edit/:blogId" element={<BlogForm />} />
            {/* Chanh */}

            <Route path="revenue" element={<Revenue />} />
            <Route path="reportpayment" element={<PaymentReport />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="UserOrder" element={<UserOrder />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="UserOrder" element={<UserOrder />} />
          <Route path="addFood" element={<AddFood />} />
          <Route path="foodBuyMost" element={<FoodBuyMost />} />
          <Route path="foodRating" element={<FoodRating />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>

      {/* Dialogflow Messenger Chatbot */}
      {/* <h1>FoodEase - Chatbot</h1> */}
      <df-messenger
	        intent="WELCOME"
	        chat-title="Hỗ_trợ_khách_hàng"	
	        agent-id="43d594b7-0744-4670-b827-407b2255c6f3"
	        language-code="vi"
	      >
        </df-messenger>
  
    </div>
  );
}

export default App;
