import React, { useState } from 'react';
import './TableAvailable.css';

const TableAvailable = ({ handleServicesPopup , tabToTalPage,tabResTables,tabPageCurrent,handleTabPageCurrent ,totalTab, openCheckTimePopup}) => {

  return (
    <div className="reservation-content">
      <h2 className="reservation-title">Available Tables</h2>
      <div className="pagination">
              <button 
                onClick={() => handleTabPageCurrent(tabPageCurrent - 1)} 
                disabled={tabPageCurrent === 0}
              >
                Prev
              </button>
              <span>Page {tabPageCurrent + 1} / {tabToTalPage}</span>
              <button 
                onClick={() => handleTabPageCurrent(tabPageCurrent + 1)} 
                 disabled={tabPageCurrent === tabToTalPage -1 }
              >
                Next
              </button><span style={ {fontWeight : "bolder"}}>Available : {totalTab}</span>
            </div>
      <div className="reservation-table-list">
        {tabResTables.map((table) => (
          <div key={table.id} className="reservation-table-item">
            <img
              src={table.imageUrl}
              alt={table.tableName}
              className="reservation-table-image"
            />
            <div className="reservation-table-info">
              <h3 className="reservation-table-title">{table.tableName}</h3>
              <p className="reservation-table-detail">Seats: {table.capacity}</p>
              <p className="reservation-table-detail">Price: {table.price.toLocaleString('vi-Vn')}đ</p>
              <p className="reservation-table-detail">Type: {table.tableCategory.tableCategoryName}(+{table.tableCategory.price.toLocaleString('vi-Vn')}đ)</p>
              <button
                className="reservation-select-button"
                onClick={() => openCheckTimePopup(table.tableId)}
              >
                Check Time 
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleServicesPopup}>Choose Service</button>
    </div>
  );
};

export default TableAvailable;
