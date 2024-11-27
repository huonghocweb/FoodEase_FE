import React from "react";
import { NavLink } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import Pagination from "../../Admin/Common/Pagination/Pagination";

const OrderHistoryList = ({
  handleSortBy,
  handleSortOrder,
  handlePageCurrent,
  handlePageSize,
  pageCurrent,
  totalPage,
  ordersByUserName,
  openOrderDetailsPopup,
}) => {
  return (
    <>
      <div className="body">
        <div id="reportsPage">
          <div id="home">
            <div className="container">
              <div className="row tm-content-row">
                <div className="col-12 tm-block-col">
                  <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                    <div className="sort-pagination-container">
                      <h5> {customTranslate("Sort By")}</h5>
                      <select onChange={(e) => handleSortBy(e.target.value)}>
                        <option value="couponId">
                          {customTranslate("Coupon Id")}
                        </option>
                        <option value="startDate">
                          {customTranslate("Start Date")}
                        </option>
                        <option value="endDate">
                          {customTranslate("End Date")}
                        </option>
                        <option value="discountPercent">
                          {customTranslate("Discount Percent")}
                        </option>
                      </select>
                      <h5>{customTranslate("Sort Order")}</h5>
                      <select onChange={(e) => handleSortOrder(e.target.value)}>
                        <option value="asc">
                          {customTranslate("Ascending")}
                        </option>
                        <option value="desc">
                          {customTranslate("Descending")}
                        </option>
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
                    <h2 className="tm-block-title">
                      {customTranslate("Coupon List")}
                    </h2>
                    <NavLink
                      className="btn btn-primary "
                      to="/admin/coupon/create"
                      style={{ display: "flex", width: "150px" }}
                    >
                      {customTranslate("New Coupon")}
                    </NavLink>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">{customTranslate("Order No.")}</th>
                          <th>{customTranslate("Order Date")}</th>
                          <th>{customTranslate("Order Time")}</th>
                          <th scope="col">{customTranslate("UserName")}</th>
                          <th scope="col">
                            {customTranslate("Delivery Address")}
                          </th>
                          <th scope="col">{customTranslate("Order Status")}</th>
                          <th scope="col">
                            {customTranslate("Payment Method")}
                          </th>
                          <th scope="col">{customTranslate("Ship Method")}</th>
                          <th scope="col">{customTranslate("Total Price")} </th>
                          <th scope="col">
                            {customTranslate("Total Quantity")}
                          </th>
                          <th colSpan={2}>{customTranslate("Function")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersByUserName.map((item, index) => (
                          <>
                            <tr>
                              <th key={index} scope="row">
                                <b>#{item.orderId}</b>
                              </th>
                              <td>{item.orderDate}</td>
                              <td>{item.orderTime}</td>
                              <td>{item.user.userName}</td>
                              <td>{item.deliveryAddress}</td>
                              <td>
                                {customTranslate(
                                  `${item.orderStatus.orderStatusName}`
                                )}
                              </td>
                              <td>{item.paymentMethod.paymentName}</td>
                              <td>
                                {customTranslate(`${item.shipMethod.shipName}`)}
                              </td>
                              <td>{item.totalQuantity}</td>
                              <td>
                                {item.totalPrice.toLocaleString("vi-VN")}đ
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    openOrderDetailsPopup(item.orderId)
                                  }
                                >
                                  <i class="fa-solid fa-circle-info fa-lg"></i>
                                </button>
                              </td>
                            </tr>
                          </>
                        ))}
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
