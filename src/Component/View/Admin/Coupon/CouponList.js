import React from "react";
import { NavLink } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import Pagination from "../Common/Pagination/Pagination";

const CouponList = ({
  coupons,
  handleSortBy,
  handleSortOrder,
  handlePageCurrent,
  handlePageSize,
  pageCurrent,
  totalPage,
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
                      <h5> SortBy</h5>
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
                          <th scope="col">{customTranslate("Coupon No.")}</th>
                          <th scope="col">{customTranslate("Code")}</th>
                          <th>{customTranslate("Image")}</th>
                          <th scope="col">{customTranslate("Description")}</th>
                          <th scope="col">
                            {customTranslate("Discount Percent")}
                          </th>
                          <th scope="col">
                            {customTranslate("Max Discount Amount")}
                          </th>
                          <th scope="col">{customTranslate("Start Date")}</th>
                          <th scope="col">{customTranslate("End Date")}</th>
                          <th scope="col">{customTranslate("Used Count")}</th>
                          <th scope="col">{customTranslate("Use Limit")}</th>
                          <th colSpan={2}>{customTranslate("Function")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((item, index) => (
                          <>
                            <tr>
                              <th key={index} scope="row">
                                <b>#{item.couponId}</b>
                              </th>
                              <td>
                                <b>{item.code}</b>
                              </td>
                              <td>
                                <img
                                  src={item.imageUrl}
                                  alt="coupon_image"
                                  style={{ width: "70px", height: "70px" }}
                                />
                              </td>
                              <td>
                                <b>{customTranslate(`${item.description}`)}</b>
                              </td>
                              <td>
                                <b>{item.discountPercent * 100}%</b>
                              </td>
                              <td>
                                {item.maxDiscountAmount.toLocaleString("vi-VN")}{" "}
                                đ
                              </td>
                              <td>{item.startDate}</td>
                              <td>{item.endDate}</td>
                              <td>{item.usedCount}</td>
                              <td>{item.useLimit}</td>
                              <td>
                                <NavLink
                                  to={`/admin/coupon/update/${item.couponId}`}
                                >
                                  <i class="fa-solid fa-gear fa-lg"></i>
                                </NavLink>
                              </td>
                              <td>
                                <i class="fa-solid fa-trash fa-lg"></i>
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

export default CouponList;
