import React from "react";
import { customTranslate } from "../../../../i18n";
import "./TableAvailable.css";

const TableAvailable = ({
  handleServicesPopup,
  tabToTalPage,
  tabResTables,
  tabPageCurrent,
  handleTabPageCurrent,
  totalTab,
  openCheckTimePopup,
}) => {
  return (
    <div className="reservation-content">
      <h2 className="reservation-title">
        {customTranslate("Available Tables")}
      </h2>
      <div className="pagination">
        <button
          onClick={() => handleTabPageCurrent(tabPageCurrent - 1)}
          disabled={tabPageCurrent === 0}
        >
          {customTranslate("Prev")}
        </button>
        <span>
          {customTranslate("Page")} {tabPageCurrent + 1} / {tabToTalPage}
        </span>
        <button
          onClick={() => handleTabPageCurrent(tabPageCurrent + 1)}
          disabled={tabPageCurrent === tabToTalPage - 1}
        >
          {customTranslate("Next")}
        </button>
        <span style={{ fontWeight: "bolder" }}>
          {customTranslate("Available")}: {totalTab}{" "}
          {totalTab > 1 ? customTranslate("Tables") : customTranslate("Table")}
        </span>
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
              <h3 className="reservation-table-title">
                {customTranslate(`${table.tableName}`)}
              </h3>
              <p className="reservation-table-detail">
                {customTranslate("Seats")}: {table.capacity}
              </p>
              <p className="reservation-table-detail">
                {customTranslate("Price")}: {table.price}
              </p>
              <p className="reservation-table-detail">
                {customTranslate("Type")}:{" "}
                {customTranslate(`${table.tableCategory.tableCategoryName}`)}(+
                {table.tableCategory.price.toLocaleString("vi-Vn")}đ)
              </p>
              <button
                className="reservation-select-button"
                onClick={() => openCheckTimePopup(table.tableId)}
              >
                {customTranslate("Check Time")}
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleServicesPopup}>
        {customTranslate("Choose Service")}
      </button>
    </div>
  );
};

export default TableAvailable;
