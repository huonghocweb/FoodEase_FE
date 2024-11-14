import React,{useState,useEffect} from 'react';
import './FoodDetail.css';
import {useParams,Link} from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import Order from './Order';
import Comment from './../Comment/Comment';
const FoodDetails = () => {
    const { id } = useParams();
    const [foodDetail,setFoodDetail] =useState([]);    
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [foodImage,setFoodImage]=useState([]);
    const[propose,setPropose] = useState([]);
    const[rating,setRating] = useState([]);
    // dử liệu foodDetails đươcj sử lí trước khi foodImage được gọi
    useEffect(() => {
      const fetchData = async () => {
          try {
              const responseDetails = await axiosConfig.get(`/user/foodvariation/findVaritionById/${id}`);
              setFoodDetail(responseDetails.data);
           
  
              const responseImages = await axiosConfig.get(`/user/foodImage/findImage/${responseDetails.data.foodId}`);
              setFoodImage(responseImages.data);
            
             
              const responsePropose =await axiosConfig.get(`/user/foodvariation/findFoodVariationByCategoryId/${responseDetails.data.food.categoryId}`);
              setPropose(responsePropose.data);

              const ResponseRating =await axiosConfig.get(`/user/foodReview/AvgRating?foodId=${responseDetails.data.foodId}`);
              setRating(ResponseRating.data);
             
             
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchData();
      
  }, [foodDetail]);
        if(!foodDetail.food )    { return null;} 
        if(!foodImage ) {return null;}
        
const openModal = (Food) => {
 
  setSelectedProduct(Food);
  console.log(Food ,'Dữ liệu food')
};

const closeModal = () => {
  setSelectedProduct(null);
}
// giá tiền sau khi giảm giá
const newPrice = foodDetail.food.basePrice- foodDetail.food.basePrice * foodDetail.food.discount / 100;

  return (
  <div className="bg-white">
    <div className="food-details">
   
    <div className="food-info">
    <div className="food-image">
      <img
        src= {`${foodDetail.food.imageUrl}`} // Thay đổi đường dẫn hình ảnh
        alt="Seasonal Vegetable Salad"
      />
      {foodDetail.quantityStock === 0 &&
             (
                 <span className="out-of-stock">OUT OF STOCK</span> 
      )}
      <div className="disscount">Disscount:{foodDetail.food.discount}%</div>
    </div>
    <h2>{foodDetail.food.foodName}</h2>
    <div className='food-image1'>
    {foodImage.map((image, index) => (
    <img
        key={index} // Không quên thêm key cho mỗi phần tử
        src={`/assets/images/${image.images}`} // Thay đổi đường dẫn hình ảnh
        alt="Seasonal Vegetable Salad"
    />
      ))}Portion
     
   
     
    </div> 
    </div>
   
    <div className="details">
      <div className="ingredients">
        <h3>Ingredients:</h3>
        <p>
         {foodDetail.food.description}
        
        </p>
      </div> 
      <div className="portion">
        <h3>Rating: {rating.rating ? rating.rating : 5}⭐</h3>
      
      
       
      </div>
      <div className="nutrition">
        <h3>Sold:{foodDetail.quantityStock}</h3>
        <p>Proteins: 2.2, Carbs: 14.4, Fats: 1.2, Total Kcal: 157.8</p>
      </div>
      <div className="">

      <b className="details-price">{newPrice.toLocaleString('vi-VN')} đ</b>
      <del className="details-price">{foodDetail.food.basePrice.toLocaleString('vi-VN')} đ</del>
      </div>
      
      <button  onClick={() => openModal(foodDetail)} className="order-button col-sm-4 me-3" disabled={!foodDetail.quantityStock}>
              {foodDetail.quantityStock ? "order" : "out of stock"}
            </button>
    </div>
  </div>
 
  <Order product={selectedProduct} onClose={closeModal}/>
  <h1  className="review">Customer reviews</h1>
  <Comment foodDetail={foodDetail}/>
  <h1>Propose</h1>
  <div className='container'>
  <div className="menu-container ">
     
     {propose.slice(0,3).map((item) => (
       <div key={item.foodVariationId} className="">
         <div className="image-discount">
           <Link to={`/FoodDetails/${item.foodVariationId}`} >
           <img  src={`${item.food.imageUrl}`} alt={item.name} className="menu-image" />
           </Link>
           <div className="disscount1">Discount:{item.food.discount}%</div>
         </div>
        
         <div className="menu-details">
         <div className="menu-header">
        
         <div >
        
         
         </div>
         
           
          
         </div>
          
           
         </div>
       </div>
     ))}
       <Order  product={selectedProduct} onClose={closeModal} />
   </div>
  </div>
 
  </div>
  );
};

export default FoodDetails;