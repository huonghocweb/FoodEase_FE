import React from 'react';
import './ResTableMap.css';
import PaginationControls from '../../../../Include/Pagination/PaginationControls';

const RestaurantMap = ({ isOpenResTableMap, handleOpenResTableMap, handleCheckResTableByCapacityAndCheckinTime, resTablesByCapaAndCheckinTime,
  paginationTableState, handleChangePaginationTableState , sortResTableOptions , handleChangeTable , reservationOrder
 }) => {
  return (
    <>
      {isOpenResTableMap && (
        <div className="res-reservation-overlay">
          <div className="res-reservation-popup">
            <div className="res-restaurant-map">
              <h2>Sơ Đồ Bàn Nhà Hàng</h2>
              <div className="res-search-bar">
                <label>Số Ghế:</label>
                <input
                  onChange={(e) => handleCheckResTableByCapacityAndCheckinTime(e.target.value)}
                  type='number'
                  min={1}
                  placeholder="Nhập số ghế"
                />
              </div>
              {/* <PaginationControls 
                  paginationState={paginationTableState}
                  handlePaginationChange={handleChangePaginationTableState}
                  sortOptions={sortResTableOptions}
                /> */}
              <h4>Total Table Available : {resTablesByCapaAndCheckinTime.length}</h4>
              <div className="res-tables">
                {resTablesByCapaAndCheckinTime.map((table, index) => (
                  <div key={index} className={`res-table ${table.status}`}>
                    <img src={table.imageUrl} alt={`Bàn ${table.tableId}`} />
                    <div className="res-table-info">
                      <span>{`Bàn ${table.tableName}`}</span>
                      <div className="res-seats">{`${table.capacity} ghế`}</div>
                    </div>
                    <button onClick={() => handleChangeTable(reservationOrder.reservationOrderId,table.tableId)} ><i class="fa-brands fa-get-pocket"></i></button>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleOpenResTableMap}>Đóng</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantMap;
