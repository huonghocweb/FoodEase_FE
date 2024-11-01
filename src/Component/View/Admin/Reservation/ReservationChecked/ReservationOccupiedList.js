import React, { useState } from 'react';
import PaginationControls from '../../../../Include/Pagination/PaginationControls';
import './ReservationOccupied.css';

const ReservationOccupiedList = ({ reservationById, foods, paginationState, handlePaginationChange, sortOptions }) => {
  const [tables, setTables] = useState([
    { id: 'T-01', status: 'available', image: 'path/to/table01.jpg' },
    { id: 'T-02', status: 'reserved', image: 'path/to/table02.jpg' },
    { id: 'T-03', status: 'billed', image: 'path/to/table03.jpg' }
  ]);
  return (
    <>
      <div className="reservation-content">
        <div className="table-management-container">
          <div className="table-management-filters">
            <button className="all-table">All Tables</button>
            <button className="reservation">Reservations</button>
            <button className="running-order">Running Orders</button>
          </div>
{/* 
          <div className="table-container">
            {tables.map((table) => (
              <div key={table.id} className={`table-management-table ${table.status}`}>
                <div className="status"></div>
                {table.id}
              </div>
            ))}
          </div> */}

          {reservationById && (
            <div className="reservation-info-box">
              <h3>Reservation Details for Table {reservationById.tableId}</h3>
              <div className="reservation-info-layout">
                <img src={reservationById.resTable.imageUrl} alt={`Table ${reservationById.tableId}`} className="reservation-table-image" />

                <div className="reservation-info-content">
                  <p><strong>User:</strong> {reservationById.user?.userName || 'N/A'}</p>
                  <p><strong>Date:</strong> {new Date(reservationById.reservationDate).toLocaleDateString('vi-VN')}</p>
                  <p><strong>Time:</strong> {new Date(reservationById.reservationDate).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p><strong>Total Price:</strong> {reservationById.totalPrice?.toLocaleString('vi-VN')} đ</p>
                  <p><strong>Status:</strong> {reservationById.reservationStatus?.reservationStatusName || 'N/A'}</p>
                </div>
              </div>

              {/* Danh sách món đã gọi cho bàn */}
              <div className="ordered-foods">
                <h4>Ordered Foods:</h4>
                {reservationById.orderedFoods && reservationById.orderedFoods.length > 0 ? (
                  <div className="ordered-foods-list">
                    {reservationById.orderedFoods.map((food) => (
                      <div key={food.foodId} className="ordered-food-item">
                        <img src={food.imageUrl} alt={food.foodName} className="food-image" />
                        <div className="food-details">
                          <p className="food-name">{food.foodName}</p>
                          <p className="food-price">{food.price.toLocaleString('vi-VN')} đ</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No foods ordered yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

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
                <button className="reservation-select-button">Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationOccupiedList;
