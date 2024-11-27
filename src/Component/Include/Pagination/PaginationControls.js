import React from "react";
import { customTranslate } from "../../../i18n";
import "./PaginationControls.css";

const PaginationControls = ({
  paginationState,
  handlePaginationChange,
  sortOptions,
}) => {
  return (
    <div className="pagination-controls">
      <div className="pagination-navigation">
        <button onClick={() => handlePaginationChange("pageCurrent", 0)}>
          <i class="fa-solid fa-backward-step fa-xl"></i>
        </button>
        <button
          onClick={() =>
            handlePaginationChange(
              "pageCurrent",
              paginationState.pageCurrent - 1
            )
          }
          disabled={paginationState.pageCurrent === 0}
        >
          <i class="fa-solid fa-backward fa-lg"></i>
        </button>
        <span>
          {customTranslate("Page")} {paginationState.pageCurrent + 1} /{" "}
          {paginationState.totalPage}
        </span>
        <button
          onClick={() =>
            handlePaginationChange(
              "pageCurrent",
              paginationState.pageCurrent + 1
            )
          }
          disabled={
            paginationState.pageCurrent === paginationState.totalPage - 1
          }
        >
          <i class="fa-solid fa-forward fa-lg"></i>
        </button>
        <button
          onClick={() =>
            handlePaginationChange("pageCurrent", paginationState.totalPage - 1)
          }
        >
          <i class="fa-solid fa-forward-step fa-xl"></i>
        </button>
      </div>

      <div className="pagination-options">
        <div className="option-group">
          <label>{customTranslate("Page Size")}:</label>
          <select
            value={paginationState.pageSize}
            onChange={(e) => handlePaginationChange("pageSize", e.target.value)}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>

        <div className="option-group">
          <label>{customTranslate("Sort By")}:</label>
          <select
            value={paginationState.sortBy}
            onChange={(e) => handlePaginationChange("sortBy", e.target.value)}
          >
            {sortOptions?.map((item, index) => (
              <option key={index} value={item.value}>
                {customTranslate(`${item.label}`)}
              </option>
            ))}
          </select>
        </div>

        <div className="option-group">
          <label>{customTranslate("Sort Order")}:</label>
          <select
            value={paginationState.sortOrder}
            onChange={(e) =>
              handlePaginationChange("sortOrder", e.target.value)
            }
          >
            <option value="asc">{customTranslate("Ascending")}</option>
            <option value="desc">{customTranslate("Descending")}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaginationControls;
