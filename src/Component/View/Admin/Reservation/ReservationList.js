import React from 'react';
import { NavLink } from 'react-router-dom';
import PaginationControls from '../../../Include/Pagination/PaginationControls';
import FilterAndSearchControls from '../../../Include/FilterAndSearch/FilterAndSearch';

const ReservationList = ({reservations,paginationState,handlePaginationChange, sortOptions , handleReservationById}) => {
    return (
        <>
           <div className="body" style={{padding : '20px'}}>
        <div id="reportsPage">
          <div id="home">
            <div className="container">
              <div className="row tm-content-row">
                <div className="col-12 tm-block-col">
                  <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                    <h2 className="tm-block-title">Reservation List</h2>
                    <PaginationControls
                    paginationState={paginationState}
                    handlePaginationChange={handlePaginationChange}
                    sortOptions = {sortOptions}
                     />
                     <FilterAndSearchControls 
                    paginationState={paginationState}
                    handlePaginationChange={handlePaginationChange}
                     />
                    <table className="table" style={{marginTop : '25px'}}> 
                      <thead>
                        <tr>
                          <th scope="col"> NO.</th>
                          <th scope="col">Reservation Id</th>
                          <th>Customer Name</th>
                          <th>TableName</th>
                          <th scope="col">Table Image</th>
                          <th scope="col">Booking Date</th>
                          <th scope="col">Checkin Time </th>
                          <th scope="col">Checkout Time </th>
                          <th scope="col">TotalDeposit</th>
                          <th scope="col">Services</th>
                          <th>Status</th>
                          <th colSpan={2}>Function</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((item, index) => (
                          <>
                            <tr  key={index}>
                            <th>{index+1}</th>
                              <th scope="row">
                                <b>#{item.reservationId}</b>
                              </th>
                              <td>
                                <b>{item.user.fullName}</b>
                              </td>
                              <td>{item.resTable.tableName}</td>
                              <td>
                                <img
                                  src={item.resTable.imageUrl}
                                  alt="coupon_image"
                                  style={{ width: "180px", height: "120px" }}
                                />
                              </td>
                              <td>{new Date(item.checkinTime).toLocaleDateString('vi-VN')}</td>
                           
                              <td>{new Date(item.checkinTime).toLocaleTimeString('vi-VN')}</td>
                              <td>{new Date(item.checkoutTime).toLocaleTimeString('vi-VN')}</td>
                              <td>
                                {item.totalDeposit?.toLocaleString('vi-VN')}{" "}
                                đ
                              </td>
                              <td>
                                {item.services.map(service => service.serviceName ).join(',')}
                              </td>
                              <td>{item.reservationStatus.reservationStatusName}</td>
                              <td>
                                {item.reservationStatus.reservationStatusId === 2 ? 
                                  <button onClick={() => handleReservationById(item.reservationId)} >Checkin</button> 
                                  : item.reservationStatus.reservationStatusId === 3 ? <NavLink className='btn btn-primary' to={`/admin/reservationOccupied/${item.reservationId}`}>Order Food</NavLink> :" "
                                }
                              </td>
                            </tr>
                          </>
                        ))}
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

export default ReservationList;