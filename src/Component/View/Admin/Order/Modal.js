import './Modal.css'
import React,{useState,useEffect} from 'react';
import axiosConfig from '../../../Config/AxiosConfig';
const Modal = ({ item,order, onClose }) => {
  const [orderDetails,setOrderDetails]=useState([]);
  const featchOrderDetails=async()=>{
    try {
      const responseOrder= await axiosConfig(`orderDetails/orderDetailsHistory/${item}`)
    
      .then(responseOrder =>{
        setOrderDetails(responseOrder.data.data)
        console.log(responseOrder.data.data);
      })
    } catch (error) {
      console.log(error);
    }
  
  }
  useEffect(()=>{
    featchOrderDetails();
    console.log(order);
  },[])
  if (!item) return null;
console.log(item);
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <span className="custom-close" onClick={onClose}>&times;</span>
        <h3>Thanks for your order</h3>
        <h4 className='order-Receipt'>Receipt</h4>
      
         
        <div>
        {orderDetails.map((item) => (
    <div className="custom-modal-body">
        <img className='order-image' src={`/assets/images/${item.foodVariations.food.imageUrl}`} alt={item.foodVariations.food.foodName} />
        <div className="order-details">
            <h4>{item.foodVariations.food.foodName}</h4>
            <h4>Size: {item.foodVariations.foodSize.foodSizeName}</h4>
            <h4>Quantity: {item.quantity}</h4>
            <h4>Price: {item.price.toLocaleString('vi-VN')}đ</h4>
        </div>
    </div>
      ))}
        </div>
        <div className="order-details-container">
    
    
    <div className="order-detail-item">
        <span className="detail-label">Total:</span>
        <span className="detail-value">{order.totalPrice.toLocaleString('vi-Vn')}đ</span>
    </div>
    
    <div className="order-detail-item">
        <span className="detail-label">Total quantity</span>
        <span className="detail-value">{order.totalQuantity}</span>
    </div>
    
    <div className="order-detail-item">
        <span className="detail-label">Shipping:</span>
        <span className="detail-value">{order.shipMethod.shipFee.toLocaleString('vi-vn')}đ</span>
    </div>
    
    <div className="order-detail-item">
        <span className="detail-label">Invoice Date:</span>
        <span className="detail-value"> {(() => {
                      const orderDate = new Date(order.orderDate);
                      return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                  })()}</span>
    </div>
    
    
</div>

   
   

         
        </div>
      </div>
    
  );
};

  
  export default Modal;