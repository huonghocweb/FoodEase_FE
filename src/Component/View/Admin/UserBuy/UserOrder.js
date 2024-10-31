import { Link } from 'react-router-dom';
import axiosConfig from "../../../Config/AxiosConfig";
import React, { useState, useEffect } from "react";
import Header from './../../../Include/Admin/Header';
import './UserOrder.css';
const UserOrder =()=>{
  
    const [userOrder, setUserOrder] = useState([]);
    const [date,setDate] = useState('');
    const [page,setPage] =useState(0);
    const [inputFind, setInputFind] = useState('');
    const [TotalPage,setTotalPage] = useState();

    const featchUserOrder = async ()=>{
        await axiosConfig.get(`/order/ReportUserBuy?date=${date}&page${page}`)
        .then(response =>{
            setUserOrder(response.data.content);
          
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
        const handleinputFind=(e)=>{
            setInputFind(e.target.value);
            console.log(e.target.value);
            }
            const findDate =()=>{
              const formattedDate = inputFind.replace(/\//g, '-');
              setDate(formattedDate)
              if(inputFind == null){
                setDate('');
              }
              console.log(inputFind);
            }
            const exportExcel = async () => {
              try {
                  const response = await axiosConfig.get('/order/exportUserBuy', {
                      responseType: 'blob' // Để nhận phản hồi dưới dạng blob
                  });
          
                  // Tạo một URL cho blob
                  const url = window.URL.createObjectURL(new Blob([response.data]));
                  
                  // Tạo một liên kết ảo để tải xuống tệp
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', `users_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`); // Thiết lập tên tệp
                  document.body.appendChild(link);
                  link.click(); // Nhấp vào liên kết ảo để tải tệp
                  document.body.removeChild(link); // Xóa liên kết
                  console.log("Tải tệp thành công");
              } catch (error) {
                  console.error('Tải tệp thất bại', error);
              }
          }
    useEffect(()=>{
        featchUserOrder();
    },[page,userOrder])
    return (
        <div>
        <div className='revenue-container2'>
        <div className='orderlist-find'>
                  <input type='date' value={inputFind}onChange={handleinputFind}/>
                  <button onClick={findDate}>find</button>
                  <button onClick={exportExcel}>Export</button>
                 
                </div>  
            <table className="revenue-table2">
                    <thead className='user-order'>
                        <tr>
                            <th className="revenue-th2">Order No.</th>
                            <th className="revenue-th2">Order date</th>
                            <th className="revenue-th2">FullName</th>
                            <th className="revenue-th2">Gender</th>
                            <th className="revenue-th2">Phone number</th>
                            <th className="revenue-th2">Email</th>
                            <th className="revenue-th2">Birthday</th>
                            <th className="revenue-th2">Address</th>
                            <th className="revenue-th2">TotalQuantity</th>
                            <th className="revenue-th2">TotalPrice</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {userOrder.map((item, index) => (
                            <tr key={index}>
                                <td className="revenue-td2">{index + 1}</td>
                                <td className="revenue-td2">  {(() => {
                                    const orderDate = new Date(item.date);
                                    return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                                })()}</td>
                                <td className="revenue-td2">{item.fullName}</td>                                
                                <td className="revenue-td2">{item.gender ? 'Male': 'Female'}</td>
                                <td className="revenue-td2">{item.phoneNumber}</td>
                                <td className="revenue-td2">{item.email}</td>
                                <td className='revenue-td2'>  {(() => {
                                    const orderDate = new Date(item.birthday);
                                    return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                                })()}</td>
                                <td className="revenue-td2">{item.address}</td>
                                <td className="revenue-td2">{item.totalQuantity}</td>
                                <td className="revenue-td2">{item.totalPrice.toLocaleString('vi-vn')}đ</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h6>{page + 1}/{TotalPage }</h6>
  <button className="Button-Previous" onClick={Previous}>Previous</button>
      <button className="Button-next" onClick={Next}>Next</button>
        </div>
        </div>

    );
}
export default UserOrder;
