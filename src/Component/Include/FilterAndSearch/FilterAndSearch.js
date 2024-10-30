import React from 'react';
import './FilterAndSearch.css';

const FilterAndSearchControls = ({
    paginationState, handlePaginationChange
}) => {
    return (
        <div className="filter-controls">
            <div className="search-box">
                <label>Search:</label>
                <input 
                    type="text"
                    value={paginationState.keyWord}
                    onChange={(e) => handlePaginationChange('keyWord', e.target.value)}
                    placeholder="Enter keyword..."
                />
            </div>

            <div className="date-filter">
                <label>Start Date:</label>
                <input 
                    type="date" 
                    value={paginationState.startDate}
                    onChange={(e) => handlePaginationChange('startDate', e.target.value)} 
                />
                <label>End Date:</label>
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
