import React from "react";

const CouponStorage = ({ couponStorageByUserId , handleAddCouponToStorage , codeInputRef ,handelCheckCoupon }) => {
  return (
    <>
     <div className="my-coupon-list-wrapper">
      <div className="voucher-container">
        {/* Header Section */}
        <div className="voucher-header">
          <input
            type="text"
            placeholder="Enter code here"
            className="voucher-input"
            ref={codeInputRef}
          />
          <button onClick={handleAddCouponToStorage} className="voucher-save-btn">Save</button>
        </div>

        {/* Tabs */}
        {/* <div className="voucher-tabs">
          <div className="tab active">Tất Cả (983)</div>
          <div className="tab">Shopee (962)</div>
          <div className="tab">Shop (17)</div>
          <div className="tab">Nạp thẻ & Dịch vụ (0)</div>
          <div className="tab">Scan & Pay (0)</div>
          <div className="tab">Dịch vụ Tài chính (4)</div>
          <div className="tab">Từ Đối Tác (0)</div>
        </div> */}

        {/* Coupon List */}
        <div className="voucher-list">
          {couponStorageByUserId.map((item, index) => (
            <div className="voucher-item" key={index}>
              <div className="voucher-left">
                {/* Coupon Image */}
                <img
                  src={item.coupon.imageUrl}
                  alt={item.logo}
                  className="voucher-image"
                />

                {/* Coupon Info */}
                <div className="voucher-info">
                  <div className="voucher-logo">{item?.logo}</div>
                  <p>{item.coupon.description}</p>
                  <p>
                    Discount: {(item.coupon.discountPercent * 100)}% - Max Discount:{" "}
                    {item.coupon.maxDiscountAmount.toLocaleString("vi")}đ
                  </p>

                  {/* Progress Bar */}
                  <div className="voucher-progress-container">
                  <span className="voucher-progress-text">
                    Used: {Math.round((item.coupon.usedCount / item.coupon.useLimit) * 100)}%
                  </span>
                    <div className="voucher-progress-bar">
                      <div
                        className="voucher-progress-fill"
                        title={`${(
                          (item.coupon.usedCount / item.coupon.useLimit) *
                          100
                        ).toFixed(1)}%`}
                        style={{
                          width: item.coupon.useLimit
                            ? `${
                                (item.coupon.usedCount /
                                  item.coupon.useLimit) *
                                100
                              }%`
                            : "0%",
                        }}
                      ></div>
                    </div>
                  
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="voucher-right">
                <p>Start Date: {item.coupon.startDate}</p>
                <button onClick={() => handelCheckCoupon(item.coupon.code)} className="voucher-btn">Use</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default CouponStorage;
