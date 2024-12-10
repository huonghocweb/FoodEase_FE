import React from "react";
import { NavLink } from "react-router-dom";
import { customTranslate } from "../../../../i18n";
import FilterAndSearchControls from "../../../Include/FilterAndSearch/FilterAndSearch";
import PaginationControls from "../../../Include/Pagination/PaginationControls";

const ReservationList = ({
  reservations,
  paginationState,
  handlePaginationChange,
  sortOptions,
  handleReservationById,
}) => {
  console.log(reservations);
  return (
    <>
      <div className="body" style={{ padding: "20px" }}>
        <div id="reportsPage">
          <div id="home">
            <div className="container">
              <div className="row tm-content-row">
                <div className="col-12 tm-block-col">
                  <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                    <h2 className="tm-block-title">
                      {customTranslate("Reservation List")}
                    </h2>
                    <PaginationControls
                      paginationState={paginationState}
                      handlePaginationChange={handlePaginationChange}
                      sortOptions={sortOptions}
                    />
                    <FilterAndSearchControls
                      paginationState={paginationState}
                      handlePaginationChange={handlePaginationChange}
                    />
                    <table className="table" style={{ marginTop: "25px" }}>
                      <thead>
                        <tr>
                          <th scope="col">{customTranslate("NO.")}</th>
                          <th scope="col">
                            {customTranslate("Reservation Id")}
                          </th>
                          <th>{customTranslate("Customer Name")}</th>
                          <th>{customTranslate("Table Name")}</th>
                          <th scope="col">{customTranslate("Image")}</th>
                          <th scope="col">{customTranslate("Booking Date")}</th>
                          <th scope="col">
                            {customTranslate("Checkin Time")}{" "}
                          </th>
                          <th scope="col">
                            {customTranslate("Checkout Time")}{" "}
                          </th>
                          <th scope="col">
                            {customTranslate("Total Deposit")}
                          </th>
                          <th scope="col">{customTranslate("Services")}</th>
                          <th>{customTranslate("Status")}</th>
                          <th colSpan={2}>{customTranslate("Function")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((item, index) => (
                          <>
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <th scope="row">
                                <b>#{item.reservationId}</b>
                              </th>
                              <td>
                                <b>{item.user.fullName}</b>
                              </td>
                              <td>
                                {customTranslate(`${item.resTable.tableName}`)}
                              </td>
                              <td>
                                <img
                                  src={item.resTable.imageUrl}
                                  alt="coupon_image"
                                  style={{ width: "120px", height: "70px" }}
                                />
                              </td>
                              <td>
                                {new Date(item.checkinTime).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </td>
                              <td>
                                {new Date(item.checkinTime).toLocaleTimeString(
                                  "vi-VN"
                                )}
                              </td>
                              <td>
                                {new Date(item.checkoutTime).toLocaleTimeString(
                                  "vi-VN"
                                )}
                              </td>
                              <td>
                                {item.totalDeposit?.toLocaleString("vi-VN")} đ
                              </td>
                              <td>
                                {item.services
                                  .map((service) =>
                                    customTranslate(service.serviceName)
                                  )
                                  .join(",")}
                              </td>
                              <td>
                                {customTranslate(
                                  `${item.reservationStatus.reservationStatusName}`
                                )}
                              </td>
                              <td>
                                {item.reservationStatus.reservationStatusId ===
                                3 ? (
                                  <button
                                    onClick={() =>
                                      handleReservationById(item.reservationId)
                                    }
                                  >
                                    {customTranslate("Checkin")}
                                  </button>
                                ) : item.reservationStatus
                                    .reservationStatusId === 4 ? (
                                  <NavLink
                                    className="btn btn-primary"
                                    to={`/admin/reservationOccupied/${item.reservationId}`}
                                  >
                                    {customTranslate("Order Food")}
                                  </NavLink>
                                ) : item.reservationStatus.reservationStatusId === 5 ? (
                                  <button
                                  >
                                     Reason
                                  </button>
                                ) : ('')}
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

export default ReservationList;
