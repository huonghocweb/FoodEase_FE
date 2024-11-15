import React from 'react';

const ReservationCheckoutPopup = ({isOpentCheckoutPopup , paymentMethod , reservationOrder , handleCheckoutReservationOrder , handleOpenCheckoutPopup}) => {
    return (
        <>
            {
                isOpentCheckoutPopup && (
                     <div className="overlay">
                    <div className="popup">
                            <div className="container-fluid"  >
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-11">
                                        <div className="card card0 rounded-0">
                                            <div className="row">
                                                <div className="col-md-2 d-md-block d-none p-0 box">
                                                </div>
                                                <div className="col-md-8 col-sm-12 p-0 box">
                                                <h1 style={{fontWeight : 'bolder'}}>CHECK OUT </h1>
                                                    <div className="card rounded-0 border-0 card2" id="paypage">
                                                        <div className="form-card">
                                                            <div className="row">
                                                                <div className="col-8 col-md-6">
                                                                    <label className="pay">FullName </label>
                                                                    <input  type="text" name="holdername" value={reservationOrder.reservation.user.fullName} />
                                                                </div>
                                                                <div className="col-4 col-md-6">
                                                                    <label className="pay">Table</label>
                                                                    <input  className="placeicon" value={reservationOrder.reservation.resTable.tableCategory.tableCategoryName}  readOnly/>
                                                                </div>
                                                            </div>
                                                            {/* <div className="row">
                                                                <div className="col-8 col-md-6">
                                                                    <label className="pay">CheckIn Time </label>
                                                                    <input type="text" name="cardno" value={new Date(reservationOrder.reservation.checkinTime).toLocaleString('vi-Vn')} />
                                                                </div>
                                                                <div className="col-8 col-md-6">
                                                                    <label className="pay">CheckIn Time  </label>
                                                                    <input type="text" name="cardno" value={new Date(reservationOrder.reservation.checkoutTime).toLocaleString('vi-Vn')} />
                                                                </div>
                                                              
                                                            </div> */}
                                                            <div className="row">
                                                            <div className="col-4 col-md-6">
                                                                    <label className="pay">Total Deposit(VNĐ)</label>
                                                                    <input  className="placeicon" value={reservationOrder.reservation.totalDeposit.toLocaleString('vi-Vn')}  readOnly/>
                                                                </div>
                                                                <div className="col-4 col-md-6">
                                                                    <label className="pay">Total Price Food Order (VNĐ)</label>
                                                                    <input
                                                                    className="placeicon"
                                                                    value={(reservationOrder.totalPrice).toLocaleString('vi-VN')}
                                                                    readOnly
                                                                    />

                                                                </div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontWeight: 'bolder',
                                                                    border: '0.2px solid ', 
                                                                    padding: '12px', 
                                                                    fontSize : '18px'           
                                                                }}
                                                                >
                                                                ToTalPrice Payment: {(reservationOrder.totalPrice - reservationOrder.reservation.totalDeposit).toLocaleString('vi-VN')}đ
                                                                </div>

                                                            {/* <div className="row">
                                                                <div className="col-md-12">
                                                                    <label className="pay" >Address</label>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <input type="text" value={1}/>
                                                                </div>
                                                            </div> */}
                                                            <label  className="pay">Payment Method</label>
                                                            <div className="radio-group">
                                                            {
                                                                paymentMethod.map((item,index) => (
                                                                <div 
                                                                key={index}
                                                                className='radio'
                                                                 onClick={() => handleCheckoutReservationOrder(item.paymentId)}  >
                                                                <img src={item.imageUrl} width="200px" height="70px"/>
                                                                </div>
                                                                ))
                                                            }
                                                                <br/>
                                                            </div> 
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <button className="btn btn-primary" onClick={handleOpenCheckoutPopup} >Close</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md- d-md-block d-none p-0 box">
                                                
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>
                </div>
		</div>   
                )
            }
        </>
    );
};

export default ReservationCheckoutPopup;