import React from "react";
import { customTranslate } from "../../../../i18n";

const OrderDetailsPopup = ({
  isOpentOrderDetails,
  orderDetailsByOrderId,
  openOrderDetailsPopup,
}) => {
  return (
    <>
      {isOpentOrderDetails && (
        <div className="overlay">
          <div className="popup">
            <div className="col-12 tm-block-col">
              <div className="tm-bg-primary-dark tm-block tm-block-taller tm-block-scroll">
                <h2 className="tm-block-title">
                  {customTranslate("Coupon List")}
                </h2>
                <div
                  style={{ display: "flex", justifyContent: "flex-start" }}
                ></div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>{customTranslate("No.")}</th>
                      <th>{customTranslate("Order Detail No.")}</th>
                      <th>{customTranslate("Food Name")}</th>
                      <th>{customTranslate("Food Size")}</th>
                      <th>{customTranslate("Image")}</th>
                      <th>{customTranslate("Quantity")} </th>
                      <th>{customTranslate("Price")} </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetailsByOrderId.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">
                          <b>{index + 1}</b>
                        </th>
                        <td>#{item.orderDetailsId}</td>
                        <td>
                          {customTranslate(
                            `${item.foodVariations.food.foodName}`
                          )}
                        </td>
                        <td>
                          {customTranslate(
                            `${item.foodVariations.foodSize.foodSizeName}`
                          )}
                        </td>
                        <img
                          src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                          style={{ width: "80px", height: "80px" }}
                          alt={item.name}
                        />
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <button className="btn btn-primary" onClick={openOrderDetailsPopup}>
              {customTranslate("Close")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailsPopup;
