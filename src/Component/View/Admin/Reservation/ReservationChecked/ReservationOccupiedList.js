import React, { useState } from "react";
import { customTranslate } from "../../../../../i18n";
import PaginationControls from "../../../../Include/Pagination/PaginationControls";
import FilterAndSearch from "../../../../Include/FilterAndSearch/FilterAndSearch";
import "./ReservationOccupied.css";

const ReservationOccupiedList = ({
  reservationById,
  foods,
  paginationState,
  handlePaginationChange,
  sortOptions,
  handleSelecteFood,
  foodIdSelected,
  handleReservationOrder,
  handleFoodOrderItemChange,
  reservationOrder,
  handleOpenCheckoutPopup,
  handleOpenResTableMap
}) => {
  console.log(foods);
  const [tables, setTables] = useState([
    { id: "T-01", status: "available", image: "path/to/table01.jpg" },
    { id: "T-02", status: "reserved", image: "path/to/table02.jpg" },
    { id: "T-03", status: "billed", image: "path/to/table03.jpg" },
  ]);
  return (
    <>
      <div className="reservation-content">
        {/* Thanh điều hướng cho bàn */}
        <div className="table-management-container">
          <div className="table-management-filters">
            <button className="all-table">
              {customTranslate("All Tables")}
            </button>
            <button className="reservation">
              {customTranslate("Reservations")}
            </button>
            <button className="running-order">
              {customTranslate("Running Orders")}
            </button>
          </div>
          {reservationById && (
            <div className="reservation-info-layout">
              {/* Thông tin đặt bàn và món đã gọi */}
              <div className="reservation-info-box">
                <div className="reservation-box">
                  <h3>
                    {customTranslate("Reservation Details for Table")}{" "}
                    {reservationById.tableId}
                  </h3>
                  <div className="reservation-info-content">
                    <img
                      src={reservationById.resTable?.imageUrl}
                      alt={`Table ${reservationById.tableId}`}
                      className="reservation-table-image"
                    />

                    <div className="reservation-details">
                    <p><strong>Table:</strong> #{reservationById.resTable?.tableId} - Capacity :  {reservationById.resTable?.capacity} </p>
                      <p>
                        <strong>{customTranslate("User")}:</strong>{" "}
                        {reservationById.user?.userName || "N/A"}
                      </p>
                      {/* <p>
                        <strong>{customTranslate("Date")}:</strong>{" "}
                        {new Date(
                          reservationById.checkinTime
                        ).toLocaleDateString("vi-VN")}
                      </p> */}
                      <p>
                        <strong>{customTranslate("Time")}:</strong>{" "}
                        {new Date(
                          reservationById.checkinTime
                        ).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p>
                        <strong>{customTranslate("Total Deposit")}:</strong>{" "}
                        {reservationById.totalDeposit?.toLocaleString("vi-VN")} đ
                      </p>
                      <p>
                        <strong>{customTranslate("Status")}:</strong>{" "}
                        {customTranslate(
                          `${
                            reservationById.reservationStatus
                              ?.reservationStatusName || "N/A"
                          }`
                        )}
                      </p>
                      <button onClick={handleOpenResTableMap}>Change Table</button>
                    </div>
                  </div>
                </div>

                {/* Danh sách món đã gọi */}
                <div className="ordered-food-container">
                  <h4>{customTranslate("Ordered Foods")}:</h4>
                  {reservationOrder ? (
                    <div className="ordered-food-list">
                      {reservationOrder.reservationOrderDetails.map(
                        (item, index) => (
                          <div key={index} className="ordered-food-item">
                            <img
                              src={item?.foods?.imageUrl}
                              alt={item?.foods.foodName}
                              className="ordered-food-image"
                            />
                            <div className="ordered-food-details">
                              <p className="ordered-food-name">
                                {customTranslate(`${item?.foods.foodName}`)}
                              </p>
                              <p className="ordered-food-price">
                                {item?.foods.basePrice?.toLocaleString("vi-VN")}{" "}
                                đ
                              </p>
                              <p className="ordered-food-quantity">
                                {customTranslate("Quantity")}: {item.quantity}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                      <p>
                        {customTranslate("Total Item")}:{" "}
                        <span>{reservationOrder.totalQuantity}</span>{" "}
                      </p>
                      <p>
                        {customTranslate("Total Price")}:{" "}
                        <span>
                          {reservationOrder.totalPrice?.toLocaleString("vi-VN")}
                        </span>{" "}
                        đ
                      </p>
                    </div>
                  ) : (
                    <p>{customTranslate("No foods ordered yet")}.</p>
                  )}
                </div>
              </div>
              <button onClick={() => handleOpenCheckoutPopup()}>
                {customTranslate("Check Out")}
              </button>
              {/* Danh sách món đã chọn */}
              {/* Danh sách món đã chọn */}
              <div className="selected-foods-box">
                <h4>{customTranslate("Selected Foods")}:</h4>
                {foodIdSelected && foodIdSelected.length > 0 ? (
                  <div className="selected-foods-list">
                    {foodIdSelected.map((item) => (
                      <div key={item.foodId} className="selected-food-item">
                        <img
                          src={item.imageUrl}
                          alt={item.foodName}
                          className="selected-food-image"
                        />
                        <div className="selected-food-details">
                          <p className="selected-food-name">
                            {customTranslate(`${item.foodName}`)}
                          </p>
                          <div className="quantity-container">
                            <input
                              type="number"
                              min={0}
                              defaultValue={1}
                              onChange={(e) =>
                                handleFoodOrderItemChange(
                                  item.foodId,
                                  parseInt(e.target.value)
                                )
                              }
                              className="quantity-input"
                            />
                            <button onClick={() => handleSelecteFood(item)}>
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <p>{customTranslate("Total Price")}: </p>
                    <button
                      style={{ width: "100px" }}
                      onClick={() => handleReservationOrder()}
                    >
                      {customTranslate("Order")}
                    </button>
                  </div>
                ) : (
                  <p>{customTranslate("No foods selected yet")}.</p>
                )}
              </div>
            </div>
          )}

          {/* Danh sách các món ăn */}
          <h2 className="reservation-title">{customTranslate("Food List")}</h2>
          <PaginationControls
            paginationState={paginationState}
            handlePaginationChange={handlePaginationChange}
            sortOptions={sortOptions}
          />
          <FilterAndSearch
            paginationState={paginationState}
            handlePaginationChange={handlePaginationChange}
           />
          <div className="reservation-table-list">
            {foods.map((item) => (
              <div key={item.foodId} className="reservation-table-item">
                <img
                  src={item.imageUrl}
                  alt={item.foodName}
                  className="reservation-table-image"
                />
                <div className="reservation-table-info">
                  <h3 className="reservation-table-title">
                    {customTranslate(`${item.foodName}`)}
                  </h3>
                  <p className="reservation-table-detail">
                    {customTranslate("Description")}:{" "}
                    {item.description || "No description available."}
                  </p>
                  <p className="reservation-table-detail">
                    {customTranslate("Price")}:{" "}
                    {item.basePrice.toLocaleString("vi-VN")} đ
                  </p>
                  <p className="reservation-table-detail">
                    {customTranslate("Type")}:{" "}
                    {item.foodCategories?.cartegoryName || "N/A"}
                  </p>
                  <button
                    onClick={() => handleSelecteFood(item)}
                    className="reservation-select-button"
                  >
                    {customTranslate("Choose Item")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationOccupiedList;
