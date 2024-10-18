import { Link } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import React, { useState, useEffect } from "react";
import Header from './../../../Include/Admin/Header';
import './Inventory.css';
const Iventory =()=>{
    const [invnetory,setInventory]=useState([]);
    const [userOrder, setUserOrder] = useState([]);
    const [page,setPage] = useState(0);
    const [TotalPage,setTotalPage] = useState();
    const fetchInventory =async ()=>{
        await axiosConfig.get(`/user/foodvariation/findAll?page=${page}`)
        .then(response =>{
            setInventory(response.data.content)
            console.log(response.data.content);
            setTotalPage(response.data.totalPages);
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
    useEffect(()=>{
        fetchInventory();
    },[page])
    return (
       
        <div className=''>
             <table  className="revenue-table container1">
                    <thead>
                        <tr>
                            <th className="revenue-th">STT</th>
                            <th className="revenue-th">CreatedAt</th>
                            <th className="revenue-th">FoodName</th>
                            <th className="revenue-th">Image</th>
                            <th className="revenue-th">FoodSizeName</th>
                            <th className="revenue-th">Description</th>
                            <th className="revenue-th">BasePrice</th>
                            <th className="revenue-th">QuantityStock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invnetory.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td">{index + 1}</td>
                                <td className="revenue-td">{item.food.createdAt}</td>
                                <td className="revenue-td">{item.food.foodName}</td>
                                <td><img className='inventory-img' src={`/assets/images/${item.food.imageUrl}`} /></td>
                                <td className="revenue-td">{item.foodSize.foodSizeName}</td>
                                <td className="revenue-td">{item.food.description}</td>
                                <td className="revenue-td">{item.food.basePrice.toLocaleString('vi-vn')}đ</td>
                                <td className={`revenue-td ${item.quantityStock === 0 ? 'low-stock' : ''}`}>
                        {item.quantityStock}
                    </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h6>{page + 1}/{TotalPage }</h6>
                <button className="Button-Previous" onClick={Previous}>Previous</button>
                <button className="Button-next" onClick={Next}>Next</button>
        </div>
    );
}
export default Iventory;