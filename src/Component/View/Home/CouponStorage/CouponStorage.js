import React from "react";
import { NavLink } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import Pagination from "../../Admin/Common/Pagination/Pagination";

const CouponStorage = ({
  coupons,
  handleSortBy,
  handleSortOrder,
  handlePageCurrent,
  handlePageSize,
  pageCurrent,
  totalPage,
  removeCoupon,
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
                      to="/claimCoupon"
                      style={{ display: "flex", width: "150px" }}
                    >
                      {customTranslate("Claim Coupon")}
                    </NavLink>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">{customTranslate("No.")}</th>
                          <th scope="col">{customTranslate("Code")}</th>
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
                          <th colSpan={2}> {customTranslate("Function")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coupons.map((item, index) => (
                          <>
                            <tr>
                              <th key={index} scope="row">
                                <b>#{item.coupon.couponId}</b>
                              </th>
                              <td>
                                <b>{item.coupon.code}</b>
                              </td>
                              <td>
                                <b>{item.coupon.description}</b>
                              </td>
                              <td>
                                <b>{item.coupon.discountPercent * 100}%</b>
                              </td>
                              <td>
                                {item.coupon.maxDiscountAmount?.toLocaleString(
                                  "vi-VN"
                                )}{" "}
                                VNĐ
                              </td>
                              <td>{item.coupon.startDate}</td>
                              <td>{item.coupon.endDate}</td>
                              <td>{item.coupon.usedCount}</td>
                              <td>{item.coupon.useLimit}</td>
                              <td>
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    removeCoupon(item.couponStorageId)
                                  }
                                >
                                  <i class="fa-solid fa-trash fa-lg"></i>
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

export default CouponStorage;
