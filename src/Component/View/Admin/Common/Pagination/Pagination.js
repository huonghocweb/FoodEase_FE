import React  from "react";
import './Pagination.css';

const Pagination = ({pageCurrent, totalPage,handlePageCurrent, handlePageSize}) => {
  // Tạo ra 1 Array để dùng thuộc tính length và tạo ra mảng chứa các chỉ số từ 0 -> totalPage -1
    const pageNumbers = Array.from({length: totalPage} , (_,i) => i);
    return (
        <div>
       
                <ul className="pagination">
                <h5>Page Size </h5>
                <select onChange={(e) => handlePageSize(e.target.value)} style={{marginRight : '50px'}}>
                    <option>Page Size</option>
                    <option value="4">4</option>
                    <option value="12">12</option>
                </select>
                    {pageNumbers.map((item,index)=> (
                        <li key={item.id} className={`page-item ${pageCurrent === item ? "active" : ''}`} >
                            <button onClick={() => handlePageCurrent(item)} className="page-link">
                                {item + 1} 
                            </button>
                        </li>
                    ))}
                   
                </ul>
               
    </div>
    )
}
export default Pagination;
