import React from 'react';
import { NavLink } from 'react-router-dom';
import Pagination from '../../Admin/Common/Pagination/Pagination';

const OrderHistoryList = ({handleSortBy,handleSortOrder,handlePageCurrent,handlePageSize,pageCurrent,totalPage , ordersByUserName, openOrderDetailsPopup}) => {
    return (
        <>
          <div className="body" >
            <div id="reportsPage">
            <div id="home">
                <div className="container">
                <div className="row tm-content-row">
                    <div className="col-12 tm-block-col">
                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                    <div className="sort-pagination-container">
                                <h5> SortBy</h5>
                                <select onChange={(e) => handleSortBy(e.target.value)} >
                                    <option value="couponId">Coupon Id</option>
                                    <option value="startDate">Start Date</option>
                                    <option value="endDate">End Date</option>
                                    <option value="discountPercent">DiscountPercent</option>
                                </select>
                                <h5>Sort Order</h5>
                                <select onChange={(e) => handleSortOrder(e.target.value)}>
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                                </div>
                                <div className="pagination-container">
                                <Pagination
                                handlePageCurrent={handlePageCurrent}
                                handlePageSize={handlePageSize}
                                pageCurrent={pageCurrent}
                                totalPage={totalPage}
                                />
                            </div>
                        <h2 className="tm-block-title">Coupon List</h2>
                        <NavLink className="btn btn-primary " to="/admin/coupon/create" style={{display : 'flex' , width: '150px'}}>New Coupon</NavLink>
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Order NO.</th>
                            <th>Order Date</th>
                            <th>Order Time</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Delivery Address</th>
                            <th scope="col">Order Status</th>
                            <th scope="col">Payment Method</th>
                            <th scope="col">Ship Method</th>
                            <th scope="col">Total Price </th>
                            <th scope="col">Total Quantity</th>
                            <th colSpan={2}>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                        ordersByUserName.map((item,index) => (
                            <>
                            <tr>
                            <th key={index} scope="row"><b>#{item.orderId}</b></th>
                            <td>{item.orderDate}</td>
                            <td>{item.orderTime}</td>
                            <td>{item.user.userName}</td>
                            <td>{item.deliveryAddress}</td>
                            <td>{item.orderStatus.orderStatusName}</td>
                            <td>{item.paymentMethod.paymentName}</td>
                            <td>{item.shipMethod.shipName}</td>
                            <td>{item.totalQuantity}</td>
                            <td>{item.totalPrice.toLocaleString('vi-VN')}đ</td>
                            <td><button onClick={() => openOrderDetailsPopup(item.orderId)} ><i class="fa-solid fa-circle-info fa-lg"></i></button></td>
                            </tr>
                            </>
                            ))
                        } 
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>    
        </>
    );
};

export default OrderHistoryList;