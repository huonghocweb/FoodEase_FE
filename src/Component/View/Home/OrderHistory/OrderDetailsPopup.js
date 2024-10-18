import React from 'react';

const OrderDetailsPopup = ({isOpentOrderDetails , orderDetailsByOrderId, openOrderDetailsPopup}) => {
    return (
        <>
     {isOpentOrderDetails && (
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
                            <th>OrderDetails NO.</th>
                            <th>Food Name</th>
                            <th>Food Size</th>
                            <th>Image</th>
                            <th>Quantity </th>
                            <th>Price </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetailsByOrderId.map((item, index) => (
                            <tr key={item.id}>
                                <th scope="row"><b>{index + 1}</b></th>
                                 <td>#{item.orderDetailsId}</td> 
                                 <td>{item.foodVariations.food.foodName}</td> 
                                 <td>{item.foodVariations.foodSize.foodSizeName}</td>
                                 <img  src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                                    style={{width : '80px', height : '80px'}}
                                  alt={item.name}  />
                                 <td>{item.price}</td> 
                                 <td>{item.quantity}</td> 
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </div>                                   
              <button className="btn btn-primary" onClick={openOrderDetailsPopup}>Close Popup</button>
              </div>
          </div>
     )} 
  </>
);
};

export default OrderDetailsPopup;