import React, { useState } from 'react';
import './TableAvailable.css';

const TableAvailablePopup = ({isOpenTableAvailable,handleTableAvailablePopup , handleServicesPopup}) => {
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    {
      id: 1,
      image: 'table1.jpg',
      title: 'Table 1',
      seats: 4,
      location: 'Near window',
    },
    {
      id: 2,
      image: 'table2.jpg',
      title: 'Table 2',
      seats: 2,
      location: 'Near entrance',
    },
    {
      id: 2,
      image: 'table2.jpg',
      title: 'Table 2',
      seats: 2,
      location: 'Near entrance',
    },
  ];


  const selectTable = (table) => {
    setSelectedTable(table);
    alert(`You have selected ${table.title}`);
  };

  return (
    <div>
      {isOpenTableAvailable && (
        <div className="reservation-popup-overlay show">
          <div className="reservation-popup-content">
            <button className="reservation-close-button" onClick={handleTableAvailablePopup}>
              &times;
            </button>
            <h2 className="reservation-popup-title">Available Tables</h2>
            <div className="reservation-table-list">
              {tables.map((table) => (
                <div key={table.id} className="reservation-table-item">
                  <img
                    src={table.image}
                    alt={table.title}
                    className="reservation-table-image"
                  />
                  <div className="reservation-table-info">
                    <h3 className="reservation-table-title">{table.title}</h3>
                    <p className="reservation-table-detail">Seats: {table.seats}</p>
                    <p className="reservation-table-detail">Location: {table.location}</p>
                    <button
                      className="reservation-select-button"
                      onClick={() => selectTable(table)}
                    >
                      Select Table
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {selectedTable && (
              <div className="reservation-selected-info">
                <p>You have selected: <strong>{selectedTable.title}</strong></p>
              </div>
            )}
            <button onClick={handleServicesPopup} >Choose Service</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAvailablePopup;
