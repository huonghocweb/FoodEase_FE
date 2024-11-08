import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axiosConfig from '../../../Config/AxiosConfig';
import axios from 'axios';
import './FoodList.css'
import Modal from './AddFoodVariation';
const FoodList = () => {

const [categories,setCategories]=useState([]);
const [Food,setFood]=useState([]);
const [page,setPage]= useState(0);
const navigate = useNavigate();
const [TotalPage,setTotalPage] = useState();
const [inputCategory,setInputCategory]=useState();
   
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const handleRowClick = (item) => {
  setSelectedItem(item);
  setIsModalOpen(true);

};

const handleFormSubmit = (event) => {
  event.preventDefault();
  console.log("Form submitted", selectedItem);
  setIsModalOpen(false);
};

const handleCloseModal = () => {
  setIsModalOpen(false); // Đóng modal
};


const fetchCategories= async ()=>{
  await axiosConfig.get(`/categories/findAll`)
  .then(response =>{
      setCategories(response.data);
  })
}
const fetchFood= async ()=>{
  await axiosConfig.get(`/user/food/findMain?page=${page}`)
  .then(response =>{
      setFood(response.data.content);
      setTotalPage(response.data.totalPages)
  })
}
const Next = () => {
  setPage(prevPage => {
    if (prevPage >= TotalPage -1) {
      return 0; // Đặt lại page về 0 nếu prevPage lớn hơn hoặc bằng totalPages
    }
    return prevPage + 1; // Tăng page lên 1 nếu chưa quá totalPages
  });
};
  const Previous = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  }
  const handleAddCategory= async ()=>{
   
    try {
      await axiosConfig.post(`/categories/addFoodCategory?categoryName=${inputCategory}`)
      setInputCategory('')
    } catch (error) {
      console.log('thất bại',error)
    }
    
  }
useEffect(()=>{
  fetchFood();
  fetchCategories();
  
},[page,Food])
const deleteFood= async (foodId)=>{
  try {
    await axiosConfig.delete(`user/food/deleteFood/${foodId}`)
  } catch (error) {
    console.error("Error deleting food:", error);
  }
 
}
  const edit=async (item)=>{
    
  navigate('/admin/addFood',{state:item})
  }
  const deleteCategory = async(index)=>{
    try {
      await axiosConfig.delete(`categories/${index}`)
      console.log("delete category")
      console.log(index)
    } catch (error) {
      console.log(error)
      console.log(index)
    }
  }
if(categories == null)
{
  return null;
}
    return (
        <div className="body">
             <div className="container mt-5">
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-products col-sm-12">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table">
                <thead>
                  <tr>
                  <th scope="col">FOOD NO.</th>
                    <th scope="col">FOOD NAME</th>
                    <th scope="col">BASE PRICE</th>
                    <th scope="">IMAGE</th>
                    <th scope="col">CREATED AT</th>                  
                    <th scope="col">DISCOUNT</th>
                    <th scope="col">CATEGORY</th>
                    <th>
                    FUNTION
                    </th>
                    
                    <th scope="col">&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                 {
                    Food.map((item,index)=>(
                      <tr  key={item.foodId}>
                    <td>{index +1}</td>
                    <td className="tm-product-name">{item.foodName}</td>
                    <td>{item.basePrice}</td>
                    <td  onClick={() => handleRowClick(item)}><img src={`${item.imageUrl}`}/></td>
                    <td>  {(() => {
                      const orderDate = new Date(item.createdAt);
                      return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                  })()}</td>
                   
                    
                    <td>{item.discount}%</td>
                    <td>{item.category.cartegoryName}</td>
                    <td><i onClick={()=> edit (item)} style={{ cursor: 'pointer' }} className="fa-solid fa-circle-info fa-lg"></i></td>
                    
                    
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i onClick={()=>deleteFood(item.foodId)} className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                    ))
                  }  
                  
                 
                </tbody>
                
              </table>
              {isModalOpen && (
        <Modal onClose={handleCloseModal} item={selectedItem} />
      )}
              <h6>{page + 1}/{TotalPage }</h6>
                <button className="Button-Previous" onClick={Previous}>Previous</button>
                <button className="Button-next" onClick={Next}>Next</button>
            </div>
            <Link
             to="/admin/addFood"
              className="btn btn-primary btn-block text-uppercase mb-3">Add Food</Link>
            
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
          <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
            <h2 className="tm-block-title">Product Categories</h2>
            <div className="tm-product-table-container">
              <table className="table tm-table-small tm-product-table">
                <tbody>

                  {
                    categories.map((item,index)=>(
                      <tr>
                        <td>{index +1}</td>
                    <td className="tm-product-name">{item.foodCategoriesName} </td>
                    <td className="text-center">
                      <a href="#" className="tm-product-delete-link">
                        <i onClick={()=> deleteCategory(item.foodCategoriesID)} className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                    ))
                  }
              
                  
                </tbody>
                
              </table>
              <input value={inputCategory} onChange={(e)=>  setInputCategory(e.target.value)} placeholder='Category name' type='text' className='category-text'/>
            </div>
            <button onClick={handleAddCategory} className="btn btn-primary btn-block text-uppercase mb-3">
              Add new category
            </button>
          </div>
          
        </div>
      </div>
    </div>
        </div>
    );
};

export default FoodList;