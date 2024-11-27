import React from "react";
import { customTranslate } from "../../../../i18n";
import FilterAndSearchControls from "../../../Include/FilterAndSearch/FilterAndSearch";
import PaginationControls from "../../../Include/Pagination/PaginationControls";

const ReservationOrderPaymentList = ({
  paginationState,
  handleChangePaginationState,
  sortOptions,
  reservationOrderPayment,
  handleReservationOrderPaymentById,
}) => {
  console.log(reservationOrderPayment);
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
                      handlePaginationChange={handleChangePaginationState}
                      sortOptions={sortOptions}
                    />
                    <FilterAndSearchControls
                      paginationState={paginationState}
                      handlePaginationChange={handleChangePaginationState}
                    />
                    <table className="table" style={{ marginTop: "25px" }}>
                      <thead>
                        <tr>
                          <th scope="col">{customTranslate("NO.")} </th>
                          <th scope="col">
                            {customTranslate("ReservationOrder Id")}
                          </th>
                          <th>{customTranslate("Customer Name")}</th>
                          <th scope="col">{customTranslate("Image")}</th>
                          <th scope="col">{customTranslate("Booking Date")}</th>
                          <th scope="col">
                            {customTranslate("Check-in and Check-out Time")}{" "}
                          </th>
                          <th scope="col">{customTranslate("Total Amount")}</th>
                          <th>{customTranslate("Total Quantity")}</th>
                          <th scope="col">{customTranslate("Services")}</th>
                          <th>{customTranslate("Status")}</th>
                          <th colSpan={2}>{customTranslate("Function")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationOrderPayment.map((item, index) => (
                          <>
                            <tr key={index}>
                              <th>{index + 1}</th>
                              <th scope="row">
                                <b>#{item.reservationOrderPaymentId}</b>
                              </th>
                              <td>
                                <b>
                                  {
                                    item.reservationOrder.reservation.user
                                      .fullName
                                  }
                                </b>
                              </td>
                              <td>
                                <img
                                  src={
                                    item.reservationOrder.reservation.resTable
                                      .imageUrl
                                  }
                                  alt="coupon_image"
                                  style={{ width: "120px", height: "80px" }}
                                />
                              </td>
                              <td>
                                {new Date(
                                  item.reservationOrder.reservation.checkinTime
                                ).toLocaleDateString("vi-VN")}
                              </td>
                              <td>
                                {new Date(
                                  item.reservationOrder.reservation.checkinTime
                                ).toLocaleTimeString("vi-VN")}{" "}
                                --
                                {new Date(
                                  item.reservationOrder.reservation.checkoutTime
                                ).toLocaleTimeString("vi-VN")}
                              </td>
                              <td>
                                {item.totalAmount?.toLocaleString("vi-VN")} đ
                              </td>
                              <td>
                                {item?.reservationOrder.totalQuantity}{" "}
                                {customTranslate("Item")}
                              </td>
                              <td>
                                {item.reservationOrder.reservation.services
                                  .map((service) =>
                                    customTranslate(service.serviceName)
                                  )
                                  .join(",")}
                              </td>
                              <td>
                                {customTranslate(
                                  `${item.reservationOrder.reservation.reservationStatus.reservationStatusName}`
                                )}
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    handleReservationOrderPaymentById(
                                      item.reservationOrderPaymentId
                                    )
                                  }
                                >
                                  {customTranslate("See Details")}
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

export default ReservationOrderPaymentList;
