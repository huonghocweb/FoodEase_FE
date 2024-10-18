import React from 'react';
import { NavLink } from 'react-router-dom';
import Pagination from '../Common/Pagination/Pagination';

const CouponList = ({coupons,handleSortBy,handleSortOrder, handlePageCurrent,handlePageSize , pageCurrent, totalPage}) => {
    return (
        <>
            <div className="body" >
        <div id="reportsPage">
      <div id="home">
        <div className="container">
          <div className="row tm-content-row">
            <div className="col-12 tm-block-col">
              <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
              <div className="sort-pagination-container">
                        <h5> SortBy</h5>
                        <select onChange={(e) => handleSortBy(e.target.value)} >
                            <option value="couponId">Coupon Id</option>
                            <option value="startDate">Start Date</option>
                            <option value="endDate">End Date</option>
                            <option value="discountPercent">DiscountPercent</option>
                        </select>
                        <h5>Sort Order</h5>
                        <select onChange={(e) => handleSortOrder(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        </div>
                        <div className="pagination-container">
                        <Pagination
                           handlePageCurrent={handlePageCurrent}
                          handlePageSize={handlePageSize}
                          pageCurrent={pageCurrent}
                          totalPage={totalPage}
                         />
                       </div>
                <h2 className="tm-block-title">Coupon List</h2>
                <NavLink className="btn btn-primary " to="/admin/coupon/create" style={{display : 'flex' , width: '150px'}}>New Coupon</NavLink>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Coupon NO.</th>
                      <th scope="col">Code</th>
                      <th>Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">DiscountPercent</th>
                      <th scope="col">Max Discount Amount</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">UsedCount</th>
                      <th scope="col">UseLimit</th>
                      <th colSpan={2}>Function</th>
                    </tr>
                  </thead>
                  <tbody>
                   {
                    coupons.map((item,index) => (
                      <>
                      <tr>
                      <th key={index} scope="row"><b>#{item.couponId}</b></th>
                      <td><b>{item.code}</b></td>
                      <td>
                      <img 
                        src={item.imageUrl} 
                        alt='coupon_image' 
                        style={{width: '70px', height: '70px'}} 
                      />
                    </td>
                      <td><b>{item.description}</b></td>
                      <td><b>{item.discountPercent * 100}%</b></td>
                      <td>{item.maxDiscountAmount.toLocaleString('vi-VN')} đ</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.usedCount}</td>
                      <td>{item.useLimit}</td>
                      <td><NavLink to={`/admin/coupon/update/${item.couponId}`}><i class="fa-solid fa-gear fa-lg"></i></NavLink></td>
                      <td><i class="fa-solid fa-tr ash fa-lg"></i></td>
                    </tr>
                      </>
                    ))
                   }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div> 
        </>
    );
};

export default CouponList;