import React from 'react';

const CouponPopup = ({isOpenCoupon,handleCouponPopUp,coupons,handleUseCoupon}) => {
    return (
              <>
           {isOpenCoupon && (
            <div className="overlay">
                <div className="popup">
                                                <div className="col-12 tm-block-col">
                                                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                                                        <h2 className="tm-block-title">Coupon List</h2>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                        </div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>CODE</th>
                                                                    <th>DISCOUNT PERCENT</th>
                                                                    <th>MAX DISCOUNT AMOUNT</th>
                                                                    <th>START DATE </th>
                                                                    <th>END DATE </th>
                                                                    <th>USE LIMIT</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                 {coupons.map((item, index) => (
                                                                    <tr key={item.id}>
                                                                        <th scope="row"><b>{index + 1}</b></th>
                                                                        <td>#{item.coupon.code}</td>
                                                                        <td>{item.coupon.discountPercent * 100}%</td>
                                                                        <td>{item.coupon.maxDiscountAmount.toLocaleString('vi-VN')}đ</td>
                                                                        <td>{item.coupon.startDate}</td>
                                                                        <td>{item.coupon.endDate}</td>
                                                                        <td>{item.coupon.useLimit}</td>
                                                                        <td><button className="btn btn-primary" onClick={() =>handleUseCoupon(item.coupon.code)}>Use</button></td> 
                                                                    </tr>
                                                                ))} 
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                    <button className="btn btn-primary" onClick={handleCouponPopUp}>Close Popup</button>
                    </div>
                </div>
           )} 
        </>
    );
};

export default CouponPopup;