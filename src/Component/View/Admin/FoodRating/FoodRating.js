import { Link } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import React, { useState, useEffect } from "react";
import Header from './../../../Include/Admin/Header';

const FoodRating =()=>{
    const[foodRating,setFoodRating] = useState([]);
    const [TotalPage,setTotalPage] = useState();
    const [page,setPage] =useState(0);
    const [sortDirection, setSortDirection] = useState('DESC');
    const [sortBy, setSortBy] = useState('avgRating');
    const fetchFoodBuyMost = async ()=>{
        await axiosConfig.get(`/user/foodReview/FoodRating?page=${page}&sortBy=${sortBy}&sortDirection=${sortDirection}`)
        .then(response =>{
            setFoodRating(response.data.content);   
            setTotalPage(response.data.totalPages);
            console.log(response.data.content)
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
        const handleSortChange = (e) => {
            setSortDirection(e.target.value);
        };
        useEffect(()=>{
            fetchFoodBuyMost();
        },[page,sortBy, sortDirection])
    return (
        <div>
             <div className='revenue-container2'>
              <select onChange={handleSortChange}>
                <option value="ASC">Worst selling food</option>
                <option value="DESC">Best selling dish</option>
            </select>
             <table className="revenue-table2">
           
                    <thead className='user-order'>
                        <tr>
                            <th className="revenue-th2">Food No.</th>
                            <th className="revenue-th2">Created date</th>
                            <th className="revenue-th2">Image</th>
                            <th className="revenue-th2">Food Name</th>
                            <th className="revenue-th2">Description</th>
                            <th className="revenue-th2">basePrice</th>                         
                            <th className="revenue-th2">discount</th>
                            <th  className="revenue-th2">Rating</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {foodRating.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td2">{index + 1}</td>
                                <td className="revenue-td2">  {(() => {
                                    const orderDate = new Date(item.foods.createdAt);
                                    return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                                })()}</td>
                                <td className="revenue-td2">    

                                    <img  className='inventory-img' src={`${item.foods.imageUrl}`}/>
                                </td>
                                <td className="revenue-td2">{item.foods.foodName}</td>                                
                                <td className="revenue-td2">{item.foods.description}</td>
                                
                                <td className="revenue-td2">{item.foods.basePrice.toLocaleString('vi-vn')}đ</td>
                             
                                <td className="revenue-td2">{item.foods.discount}%</td>
                                <td   className="revenue-td2">{item.rating}⭐</td>
                                
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h6>{page + 1}/{TotalPage }</h6>
  <button className="Button-Previous" onClick={Previous}>Previous</button>
      <button className="Button-next" onClick={Next}>Next</button>
        </div>
        </div>
    )
}
export default FoodRating;