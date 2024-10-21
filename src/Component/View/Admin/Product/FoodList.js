import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom'
import axiosConfig from '../../../Config/AxiosConfig';
import axios from 'axios';
const FoodList = () => {

const [categories,setCategories]=useState([]);
const [Food,setFood]=useState([]);
const [page,setPage]= useState(1);
    const [TotalPage,setTotalPage] = useState();

   
const fetchCategories= async ()=>{
  await axiosConfig.get(`/categories/findAll`)
  .then(response =>{
      setCategories(response.data);
      console.log(response.data);
  })
}
const fetchFood= async ()=>{
  await axiosConfig.get(`/user/food/findMain?page=${page}`)
  .then(response =>{
      setFood(response.data.content);
      setTotalPage(response.data.totalPages)
      console.log(response.data.content);
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
  console.log(page)
useEffect(()=>{
  fetchFood();
  fetchCategories();
},[page])
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
                    <th scope="col">UPDATE AT</th>
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
                      <tr>
                    <td>{index +1}</td>
                    <td className="tm-product-name">{item.foodName}</td>
                    <td>{item.basePrice}</td>
                    <td><img src={`/assets/images/${item.imageUrl}`}/></td>
                    
                    <td>{item.createdAt}</td>
                    <td>{item.updatedAt}</td>
                    <td>{item.discount}</td>
                    <td>{item.category.cartegoryName}</td>
                    <td><i className="fa-solid fa-circle-info fa-lg"></i></td>
                    
                    
                    <td>
                      <a href="#" className="tm-product-delete-link">
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                    ))
                  }  
                  
                 
                </tbody>
                
              </table>
              <h6>{page + 1}/{TotalPage }</h6>
                <button className="Button-Previous" onClick={Previous}>Previous</button>
                <button className="Button-next" onClick={Next}>Next</button>
            </div>
            <Link
             to="/admin/addFood"
              className="btn btn-primary btn-block text-uppercase mb-3">Add Food</Link>
            <button className="btn btn-primary btn-block text-uppercase">
              Delete Food
            </button>
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
                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                      </a>
                    </td>
                  </tr>
                    ))
                  }
                  
                  
                </tbody>
              </table>
            </div>
            <button className="btn btn-primary btn-block text-uppercase mb-3">
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