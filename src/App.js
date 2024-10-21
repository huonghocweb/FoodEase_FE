import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayOut from './Component/View/Admin/AdminLayOut';
import OrderPage from './Component/View/Admin/Order/OrderPage';
import HomeLayOut from './Component/View/Home/HomeLayOut';
import UserPage from './Component/View/Admin/User/UserPage';
import Header from './Component/Include/Home/Header';
import FoodPage from './Component/View/Admin/Product/FoodPage';
import FoodIndex from './Component/View/Home/Index/FoodIndex';
import Order from './Component/View/Home/Details/Order';
import FoodDetails from './Component/View/Home/Details/FoodDetails';
import Footer from './Component/Include/Home/Footer';
import CartPage from './Component/View/Home/Cart/CartPage';
import Thanks from './Component/View/Home/Thank/Thanks';
import BoxChatPage from './Component/View/Home/Chat/BoxChatPage';
import CouponPage from './Component/View/Admin/Coupon/CouponPage';
import CouponFormPage from './Component/View/Admin/Coupon/CouponFormPage';
import CouponStoragePage from './Component/View/Home/CouponStorage/CouponStoragePage';
import ClaimCoupon from './Component/View/Home/CouponStorage/ClaimCoupon';
import ClaimCouponPage from './Component/View/Home/CouponStorage/ClaimCouponPage';
import OrderHistoryPage from './Component/View/Home/OrderHistory/OrderHistoryPage';
import Login from './Component/View/Home/Login/Login';
import OrderStatus from './Component/View/Home/MyOrder/OrderStatus';
import Notification from './Component/View/Admin/Notification/Notification';
import Revenue from './Component/View/Admin/Revenue/Revenue';
import Inventory from './Component/View/Admin/Inventory/Inventory.js';
import UserOrder from './Component/View/Admin/UserBuy/UserOrder.js'
import UserFormPage from './Component/View/Admin/User/UserFormPage.js';
import WishList from './Component/View/Home/WishList/WishList.js';
import BookTablePage from './Component/View/Home/BookingTable/BookTablePage.js';

function App() {
  return (
    <div className="App"> 
     <BrowserRouter>
     <Header />
        <Routes>
          <Route path="/" element={<HomeLayOut />}>
            <Route index element={<FoodIndex />} />
            <Route path='login' element={<Login />} />
            <Route path='notification' element={<Notification/>}/>
            <Route path="foodDetailsPopup" element={<Order />} />
            <Route path='foodDetails/:id' element={<FoodDetails />} />
            <Route path='cart/:cartId' element={<CartPage/>} />
            <Route path='/thanks/:paymentmethod' element={<Thanks />} />
            <Route path='chat' element={<BoxChatPage/>} />
            <Route path='couponStorage' element={<CouponStoragePage />} />
            <Route path="WishList" element={<WishList />} />
            <Route path='claimCoupon' element={<ClaimCouponPage />} />
            <Route path='orderHistory/order/:userName' element={<OrderHistoryPage />} />
            <Route path='/myOrder' element={<OrderStatus/>} />
            <Route path='/bookTable' element={<BookTablePage />} />
          </Route>

          <Route path="/admin" element={<AdminLayOut />}>
            <Route index element={<OrderPage />} />
            <Route path="users" element ={<UserPage />} />
            <Route path="user/create" element={<UserFormPage />} />
            <Route path="user/edit/:userId" element={<UserFormPage />} />
            <Route path="foods" element={<FoodPage />} />
            <Route path="coupons" element={<CouponPage />} />
            <Route path="coupon/create" element={<CouponFormPage />} />
            <Route path="coupon/update/:couponId" element= {<CouponFormPage />} />
            <Route path="revenue" element={<Revenue />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="UserOrder" element={<UserOrder />} />
          </Route>
        </Routes>
        <Footer />
     </BrowserRouter>
    </div>
  );
}

export default App;
