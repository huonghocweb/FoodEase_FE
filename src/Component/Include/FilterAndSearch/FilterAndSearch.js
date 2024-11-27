import React from 'react';
import { customTranslate } from "../../../i18n";
import './FilterAndSearch.css';

const FilterAndSearchControls = ({
    paginationState, handlePaginationChange
}) => {
    return (
        <div className="filter-controls">
            <div className="search-box">
                <label>{customTranslate("Search")}:</label>
                <input 
                    type="text"
                    value={paginationState.keyWord}
                    onChange={(e) => handlePaginationChange('keyWord', e.target.value)}
                    placeholder={customTranslate("Enter keyword...")}
                />
            </div>

            <div className="date-filter">
                <label>{customTranslate("Start Date")}:</label>
                <input 
                    type="date" 
                    value={paginationState.startDate}
                    onChange={(e) => handlePaginationChange('startDate', e.target.value)} 
                />
                <label>{customTranslate("End Date")}:</label>
                <input 
                    type="date" 
                    value={paginationState.endDate}
                    onChange={(e) => handlePaginationChange('endDate', e.target.value)} 
                />
            </div>
        </div>
    );
};

export default FilterAndSearchControls;
