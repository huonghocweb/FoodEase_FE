import React from 'react';
import { customTranslate } from "../../../../i18n";


const CouponPopup = ({isOpenCoupon,handleCouponPopUp,coupons,handleUseCoupon}) => {
    return (
              <>
           {isOpenCoupon && (
            <div className="overlay">
                <div className="popup">
                                                <div className="col-12 tm-block-col">
                                                    <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                                                        <h2 className="tm-block-title">{customTranslate("Coupon List")}</h2>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                        </div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th>{customTranslate("No.")}</th>
                                                                    <th>{customTranslate("Code")}</th>
                                                                    <th>{customTranslate("Discount Percent")}</th>
                                                                    <th>{customTranslate("Max Discount Amount")}</th>
                                                                    <th>{customTranslate("Start Date")} </th>
                                                                    <th>{customTranslate("End Date")} </th>
                                                                    <th>{customTranslate("Use Limit")}</th>
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
                                                                        <td><button className="btn btn-primary" onClick={() =>handleUseCoupon(item.coupon.code)}>{customTranslate("Use")}</button></td> 
                                                                    </tr>
                                                                ))} 
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                    <button className="btn btn-primary" onClick={handleCouponPopUp}>{customTranslate("Close")}</button>
                    </div>
                </div>
           )} 
        </>
    );
};

export default CouponPopup;