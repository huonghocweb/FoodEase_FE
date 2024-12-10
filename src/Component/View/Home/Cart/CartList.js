import React from "react";
import { NavLink } from "react-router-dom";
import { customTranslate } from "../../../../i18n";

const CartList = ({
  handlePaymentPopup,
  handleOpenCouponStorage,
  cartItem,
  totalQuantity,
  totalPrice,
  handleAddCartItem,
  handleOpenDelivery,
  shipFee,
  points,
  handleUsePoint,
  isUsePoint,
  addressState, 
  couponByCode, 
  handleRemoveCoupon
}) => {
  console.log(addressState);
  return (
    <div>
      <section
        className="h-100 h-custom"
        style={{ backgroundColor: "#d2c9ff" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h1 className="fw-bold mb-0">
                            {customTranslate("Shopping Cart")}
                          </h1>
                          <h6 className="mb-0 text-muted">
                            {totalQuantity} {customTranslate("items")}
                          </h6>
                        </div>
                        <hr className="my-4" />
                        {cartItem.map((item) => (
                          <div key={item.id}>
                            <div className="row mb-4 d-flex justify-content-between align-items-center">
                              <div className="col-md-2 col-lg-2 col-xl-2">
                                <img
                                  src={item.foodVariation.food.imageUrl}
                                  //    src={`/assets/images/${item.foodVariation.food.imageUrl}`}
                                  className="img-fluid rounded-3"
                                  alt="Cotton T-shirt"
                                />
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-3">
                                <h6 className="text-muted">
                                  {customTranslate(
                                    `${item.foodVariation.food.foodName}`
                                  )}
                                </h6>
                                <h6 className="mb-0">
                                  {customTranslate(
                                    `${item.foodVariation.foodSize.foodSizeName}`
                                  )}{" "}
                                </h6>
                              </div>
                              <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    handleAddCartItem(
                                      -1,
                                      item.foodVariation.foodVariationId
                                    )
                                  }
                                >
                                  <i className="fas fa-minus"></i>
                                </button>

                                <input
                                  name="quantity"
                                  min={1}
                                  value={item.quantity}
                                  type="text"
                                  className="formCart-control form-control-sm"
                                  style={{ width: "35px" }}
                                />
                                <button
                                  className="btn btn-link px-2"
                                  onClick={() =>
                                    handleAddCartItem(
                                      1,
                                      item.foodVariation.foodVariationId
                                    )
                                  }
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                <h6 className="mb-0">
                                  {item.price.toLocaleString("vi-VN")} đ
                                </h6>
                              </div>
                              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                <div
                                //  onClick={()=> removeCartItem(item.productVariationResponse.id)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </div>
                              </div>
                            </div>
                            <hr className="my-4" />
                          </div>
                        ))}
                        <div className="pt-5">
                          <h6 className="mb-0">
                            <NavLink to="/" className="text-body">
                              <i className="fas fa-long-arrow-alt-left me-2"></i>
                              {customTranslate("Back to shop")}
                            </NavLink>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 bg-body-tertiary">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">
                          {customTranslate("Summary")}
                        </h3>
                        <hr className="my-4" />

                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase">
                            {customTranslate("items")} : {totalQuantity}
                          </h5>
                          <h5> {totalPrice?.toLocaleString("vi-VN")} đ</h5>
                        </div>
                        <h5 className="text-uppercase mb-3">
                          {customTranslate("Shipping")}
                        </h5>
                        <div className="mb-4 pb-2">
                         <textarea value={addressState.fullAddress} disabled rows={2} cols={35}></textarea>
                          <button onClick={handleOpenDelivery}>
                            {" "}
                            {customTranslate("Choose Delivery Address")}
                          </button>
                        </div>
                        <div className="d-flex justify-content-between mb-4">
                          <h5 className="text-uppercase mb-1">
                            {customTranslate("My Point")}:{" "}
                            {points.availablePoint}{" "}
                            <i class="fa-solid fa-coins"></i>
                          </h5>
                          <label
                            className="switch"
                            style={{ marginLeft: "53px" }}
                          >
                            <input
                              className="toggle"
                              type="checkbox"
                              onChange={() =>
                                handleUsePoint(points.availablePoint)
                              }
                            />

                            <span className="slider"></span>
                            <span className="card-side"></span>
                          </label>
                        </div>

                        <h5 className="text-uppercase mb-3">
                          {customTranslate("Give code")}
                        </h5>
                        <div className="mb-5">
                          <div className="form-outline">
                            <form>
                              <input
                                type="text"
                                className="form-control-lg"
                                placeholder={customTranslate("Enter your code")}
                                name="codeCoupon"
                                value={couponByCode?.code}
                              />{" "}
                              <br></br>
                              {couponByCode && (
                                  <div className="coupon-container">
                                    <div className="coupon-content">
                                      <img src={couponByCode.imageUrl} className="coupon-avatar" alt="Coupon" />
                                      <span className="coupon-discount">Discount: {(couponByCode.discountPercent * 100)}%</span>
                                    </div>
                                    <button onClick={handleRemoveCoupon} className="btn btn-primary coupon-delete-btn">Delete</button>
                                  </div>
                                )}
                            </form>
                            <button
                              className="btn btn-primary"
                              onClick={handleOpenCouponStorage}
                            >
                              {customTranslate("Coupon Storage")}
                            </button>
                          </div>
                          
                        </div>
                        <hr className="my-4" />
                        <div className="d-flex justify-content-between mb-5">
                          <h5
                            style={{
                              padding: "15px",
                              fontSize: "18px",
                              borderBottom: "2px solid #ccc",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{customTranslate("Total Price")}: </span>
                              <span style={{ fontWeight: "bold" }}>
                                {totalPrice?.toLocaleString("vi-VN")} đ
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <span>{customTranslate("Ship Fee")}: </span>
                              <span style={{ fontWeight: "bold" }}>
                                {" "}
                                + {shipFee?.toLocaleString("vi-VN")} đ
                              </span>
                            </div>
                            {isUsePoint && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>{customTranslate("Point")}: </span>
                                <span style={{ fontWeight: "bold" }}>
                                  {" "}
                                  -{" "}
                                  {points.availablePoint?.toLocaleString(
                                    "vi-VN"
                                  )}{" "}
                                  đ
                                </span>
                              </div>
                            )}
                            {addressState.couponId === null ? (
                              <>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>{customTranslate("Final Price")}:</span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {" "}
                                    {(totalPrice + shipFee)?.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    đ
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>{customTranslate("Discount")} :</span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {" "}
                                    - {addressState.discountAmount.toLocaleString("vi-VN")} đ
                                  </span>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <span>{customTranslate("Final Price")}:</span>
                                  <span style={{ fontWeight: "bold" }}>
                                    {(
                                      totalPrice -
                                      addressState.discountAmount +
                                      shipFee
                                    )?.toLocaleString("vi-VN")}{" "}
                                    đ
                                  </span>
                                </div>
                              </div>
                            )}
                          </h5>
                        </div>
                        <button
                          className="btn btn-dark btn-block btn-lg"
                          onClick={handlePaymentPopup}
                        >
                          {customTranslate("Check Out")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartList;
