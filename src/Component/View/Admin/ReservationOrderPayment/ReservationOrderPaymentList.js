import React from 'react';
import PaginationControls from '../../../Include/Pagination/PaginationControls';
import FilterAndSearchControls from '../../../Include/FilterAndSearch/FilterAndSearch';

const ReservationOrderPaymentList = ({paginationState, handleChangePaginationState,sortOptions, reservationOrderPayment, handleReservationOrderPaymentById}) => {
    console.log(reservationOrderPayment);
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
                    handlePaginationChange={handleChangePaginationState}
                    sortOptions = {sortOptions}
                     />
                     <FilterAndSearchControls 
                    paginationState={paginationState}
                    handlePaginationChange={handleChangePaginationState}
                     />
                    <table className="table" style={{marginTop : '25px'}}> 
                      <thead>
                        <tr>
                          <th scope="col"> NO.</th>
                          <th scope="col">ReservationOrder Id</th>
                          <th>Customer Name</th>
                          <th scope="col">Table Image</th>
                          <th scope="col">Booking Date</th>
                          <th scope="col">Checkin Checkout Time </th>
                          <th scope="col">Total Amount</th>
                          <th>Total Quantity</th>
                          <th scope="col">Services</th>
                          <th>Status</th>
                          <th colSpan={2}>Function</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservationOrderPayment.map((item, index) => (
                          <>
                            <tr  key={index}>
                            <th>{index+1}</th>
                              <th scope="row">
                                <b>#{item.reservationOrderPaymentId}</b>
                              </th>
                              <td>
                                <b>{item.reservationOrder.reservation.user.fullName}</b>
                              </td>
                              <td>
                                <img
                                  src={item.reservationOrder.reservation.resTable.imageUrl}
                                  alt="coupon_image"
                                  style={{ width: "120px", height: "80px" }}
                                />
                              </td>
                              <td>{new Date(item.reservationOrder.reservation.checkinTime).toLocaleDateString('vi-VN')}</td>
                              <td>{new Date(item.reservationOrder.reservation.checkinTime).toLocaleTimeString('vi-VN')} --
                              {new Date(item.reservationOrder.reservation.checkoutTime).toLocaleTimeString('vi-VN')}</td>
                              <td>
                                {item.totalAmount?.toLocaleString('vi-VN')}{" "}
                                đ
                              </td>
                              <td>{item?.reservationOrder.totalQuantity} Item</td>
                              <td>
                                {item.reservationOrder.reservation.services.map(service => service.serviceName ).join(',')}
                              </td>
                              <td>{item.reservationOrder.reservation.reservationStatus.reservationStatusName}</td>
                              <td>
                                  <button onClick={() => handleReservationOrderPaymentById(item.reservationOrderPaymentId)} >See Details</button> 
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

export default ReservationOrderPaymentList;