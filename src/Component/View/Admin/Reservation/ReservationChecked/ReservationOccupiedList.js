import React, { useState } from 'react';
import PaginationControls from '../../../../Include/Pagination/PaginationControls';
import './ReservationOccupied.css';

const ReservationOccupiedList = ({ reservationById, foods, paginationState, handlePaginationChange, sortOptions , handleSelecteFood , foodIdSelected 
  , handleReservationOrder , handleFoodOrderItemChange , reservationOrder , handleOpenCheckoutPopup
 }) => {
  const [tables, setTables] = useState([
    { id: 'T-01', status: 'available', image: 'path/to/table01.jpg' },
    { id: 'T-02', status: 'reserved', image: 'path/to/table02.jpg' },
    { id: 'T-03', status: 'billed', image: 'path/to/table03.jpg' }
  ]);
  return (
    <>
<div className="reservation-content">
    {/* Thanh điều hướng cho bàn */}
    <div className="table-management-container">
        <div className="table-management-filters">
            <button className="all-table">All Tables</button>
            <button className="reservation">Reservations</button>
            <button className="running-order">Running Orders</button>
        </div>
        {reservationById && (
            <div className="reservation-info-layout">
                {/* Thông tin đặt bàn và món đã gọi */}
                <div className="reservation-info-box">
                    <div className="reservation-box">
                        <h3>Reservation Details for Table {reservationById.tableId}</h3>
                        <div className="reservation-info-content">
                            <img src={reservationById.resTable?.imageUrl} alt={`Table ${reservationById.tableId}`} className="reservation-table-image" />

                            <div className="reservation-details">
                                <p><strong>User:</strong> {reservationById.user?.userName || 'N/A'}</p>
                                <p><strong>Date:</strong> {new Date(reservationById.reservationDate).toLocaleDateString('vi-VN')}</p>
                                <p><strong>Time:</strong> {new Date(reservationById.reservationDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p><strong>Total Price:</strong> {reservationById.totalPrice?.toLocaleString('vi-VN')} đ</p>
                                <p><strong>Status:</strong> {reservationById.reservationStatus?.reservationStatusName || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách món đã gọi */}
                    <div className="ordered-food-container">
                      <h4>Ordered Foods:</h4>
                      {reservationOrder ? (
                          <div className="ordered-food-list">
                              {reservationOrder.reservationOrderDetails.map((item, index) => (
                                  <div key={index} className="ordered-food-item">
                                      <img src={item?.foods?.imageUrl} alt={item?.foods.foodName} className="ordered-food-image" />
                                      <div className="ordered-food-details">
                                          <p className="ordered-food-name">{item?.foods.foodName}</p>
                                          <p className="ordered-food-price">{item?.foods.basePrice?.toLocaleString('vi-VN')} đ</p>
                                          <p className="ordered-food-quantity">Số lượng: {item.quantity}</p>
                                      </div>
                                  </div>
                              ))}
                              <p>Total Item : {reservationOrder.totalQuantity}</p>
                              <p>Total Price: {reservationOrder.totalPrice?.toLocaleString('vi-VN')} đ</p>
                          </div>
                      ) : (
                          <p>No foods ordered yet.</p>
                      )}
                  </div>
                </div>
                <button onClick={()=> handleOpenCheckoutPopup()}>CheckOut</button>
                {/* Danh sách món đã chọn */}
              {/* Danh sách món đã chọn */}
              <div className="selected-foods-box">
                  <h4>Selected Foods:</h4>
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
                                      <p className="selected-food-name">{item.foodName}</p>
                                      <div className="quantity-container">
                                          <input
                                              type="number"
                                              min={0}
                                              defaultValue={1}
                                              onChange={(e) => handleFoodOrderItemChange(item.foodId, parseInt(e.target.value))}
                                              className="quantity-input"
                                          />
                                          <button onClick={() => handleSelecteFood(item)}><i class="fa-solid fa-trash"></i></button>
                                      </div>
                                  </div>
                              </div>
                          ))}
                          <p>Total Price: </p>
                          <button style={{width: '100px'}} onClick={() => handleReservationOrder()}>Order</button>
                      </div>
                  ) : (
                      <p>No foods selected yet.</p>
                  )}
              </div>

            </div>
        )}

        {/* Danh sách các món ăn */}
        <h2 className="reservation-title">Food List</h2>
        <PaginationControls
            paginationState={paginationState}
            handlePaginationChange={handlePaginationChange}
            sortOptions={sortOptions}
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
                        <h3 className="reservation-table-title">{item.foodName}</h3>
                        <p className="reservation-table-detail">Description: {item.description || 'No description available.'}</p>
                        <p className="reservation-table-detail">Price: {item.basePrice.toLocaleString('vi-VN')} đ</p>
                        <p className="reservation-table-detail">Type: {item.foodCategories?.cartegoryName || 'N/A'}</p>
                        <button onClick={() => handleSelecteFood(item)} className="reservation-select-button">Choose Item</button>
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
