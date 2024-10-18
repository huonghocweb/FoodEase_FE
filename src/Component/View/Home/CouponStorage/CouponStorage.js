import React from 'react';
import { NavLink } from 'react-router-dom';
import Pagination from '../../Admin/Common/Pagination/Pagination';

const CouponStorage = ({coupons,handleSortBy,handleSortOrder,handlePageCurrent,handlePageSize,pageCurrent,totalPage,removeCoupon}) => {
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
            <NavLink className="btn btn-primary " to="/claimCoupon" style={{display : 'flex' , width: '150px'}}>Claim Coupon</NavLink>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Coupon NO.</th>
                  <th scope="col">Code</th>
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
                  <th key={index} scope="row"><b>#{item.coupon.couponId}</b></th>
                  <td><b>{item.coupon.code}</b></td>
                  <td><b>{item.coupon.description}</b></td>
                  <td><b>{item.coupon.discountPercent * 100}%</b></td>
                  <td>{item.coupon.maxDiscountAmount?.toLocaleString('vi-VN')} VNĐ</td>
                  <td>{item.coupon.startDate}</td>
                  <td>{item.coupon.endDate}</td>
                  <td>{item.coupon.usedCount}</td>
                  <td>{item.coupon.useLimit}</td>
                  <td><button className='btn btn-primary' onClick={() =>removeCoupon(item.couponStorageId)}><i class="fa-solid fa-trash fa-lg"></i></button></td>
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

export default CouponStorage;