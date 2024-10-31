import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Component/Include/Home/Footer";
import Header from "./Component/Include/Home/Header";
import AdminLayOut from "./Component/View/Admin/AdminLayOut";
import BlogForm from "./Component/View/Admin/Blog/BlogForm.js";
import BlogList from "./Component/View/Admin/Blog/BlogList.js";
import CouponFormPage from "./Component/View/Admin/Coupon/CouponFormPage";
import CouponPage from "./Component/View/Admin/Coupon/CouponPage";
import Inventory from "./Component/View/Admin/Inventory/Inventory.js";
import Notification from "./Component/View/Admin/Notification/Notification";
import OrderPage from "./Component/View/Admin/Order/OrderPage";
import PaymentReport from "./Component/View/Admin/PaymentReport/PaymentReport.js";
import AddFood from './Component/View/Admin/Product/AddFood.js';
import FoodPage from "./Component/View/Admin/Product/FoodPage";
import ResTableForm from "./Component/View/Admin/ResTable/ResTableForm.js";
import ResTableList from "./Component/View/Admin/ResTable/ResTableList.js";
import Revenue from "./Component/View/Admin/Revenue/Revenue";
import ServiceForm from "./Component/View/Admin/Service/ServiceForm.js";
import ServiceList from "./Component/View/Admin/Service/ServiceList.js";
import UserFormPage from "./Component/View/Admin/User/UserFormPage.js";
import UserPage from "./Component/View/Admin/User/UserPage";
import UserOrder from "./Component/View/Admin/UserBuy/UserOrder.js";
import BlogDetail from "./Component/View/Home/BlogEntries/BlogDetail.js";
import BlogEntries from "./Component/View/Home/BlogEntries/BlogEntries.js";
import BookTablePage from "./Component/View/Home/BookingTable/BookTablePage.js";
import CartPage from "./Component/View/Home/Cart/CartPage";
import BoxChatPage from "./Component/View/Home/Chat/BoxChatPage";
import ClaimCouponPage from "./Component/View/Home/CouponStorage/ClaimCouponPage";
import CouponStoragePage from "./Component/View/Home/CouponStorage/CouponStoragePage";
import FoodDetails from "./Component/View/Home/Details/FoodDetails";
import Order from "./Component/View/Home/Details/Order";
import HomeLayOut from "./Component/View/Home/HomeLayOut";
import FoodIndex from "./Component/View/Home/Index/FoodIndex";
import Login from "./Component/View/Home/Login/Login";
import OrderStatus from "./Component/View/Home/MyOrder/OrderStatus";
import OrderHistoryPage from "./Component/View/Home/OrderHistory/OrderHistoryPage";
import Thanks from "./Component/View/Home/Thank/Thanks";
import WishList from "./Component/View/Home/WishList/WishList.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomeLayOut />}>
            <Route index element={<FoodIndex />} />
            <Route path="login" element={<Login />} />
            <Route path="notification" element={<Notification />} />
            <Route path="foodDetailsPopup" element={<Order />} />
            <Route path="foodDetails/:id" element={<FoodDetails />} />
            <Route path="WishList/foodDetails/:id" element={<FoodDetails />} />
            <Route path="cart/:cartId" element={<CartPage />} />
            <Route path="/thanks/:paymentmethod" element={<Thanks />} />
            <Route path="chat" element={<BoxChatPage />} />
            <Route path="couponStorage" element={<CouponStoragePage />} />
            <Route path="WishList" element={<WishList />} />
            <Route path='claimCoupon' element={<ClaimCouponPage />} />
            <Route path='orderHistory/order/:userName' element={<OrderHistoryPage />} />
            <Route path='/myOrder' element={<OrderStatus/>} />
            <Route path='/bookTable' element={<BookTablePage />} />
            <Route path="wishlist/:wishListId" element={<WishList />} />
            <Route path="claimCoupon" element={<ClaimCouponPage />} />
            {/* chánh */}
            <Route path="blog" element={<BlogEntries />} />
            <Route path="blog/:blogId" element={<BlogDetail />} />
            {/* chánh */}
            <Route
              path="orderHistory/order/:userName"
              element={<OrderHistoryPage />}
            />
            <Route path="/myOrder" element={<OrderStatus />} />
          </Route>

          <Route path="/admin" element={<AdminLayOut />}>
            <Route index element={<OrderPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="user/create" element={<UserFormPage />} />
            <Route path="user/edit/:userId" element={<UserFormPage />} />
            <Route path="foods" element={<FoodPage />} />
            <Route path="coupons" element={<CouponPage />} />
            <Route path="coupon/create" element={<CouponFormPage />} />
            <Route
              path="coupon/update/:couponId"
              element={<CouponFormPage />}
            />
            {/* <Route path="reservation-list" element={<ReservationList />} /> */}
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
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
