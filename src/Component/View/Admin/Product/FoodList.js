import React,{useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axiosConfig from '../../../Config/AxiosConfig';
import axios from 'axios';
import './FoodList.css'
import Modal from './AddFoodVariation';
import CustomAlert from '../../../Config/CustomAlert';
import ConfirmDeleteModal from './ConfirmDeleteModal';
const FoodList = () => {

const [categories,setCategories]=useState([]);
const [Food,setFood]=useState([]);
const [page,setPage]= useState(0);
const navigate = useNavigate();
const [TotalPage,setTotalPage] = useState();
const [inputCategory,setInputCategory]=useState();
const [alert, setAlert] = useState(null); 
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
const [isOpenconfirm, setisOpenconfirm] = useState(false);
const [isOpenDelete, setOpenDelete] = useState(false);
  const [foodIdToDelete, setFoodIdToDelete] = useState(null);
  const handleOpenModal = (foodId) => {
    setFoodIdToDelete(foodId);
    setOpenDelete(true);
  };
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
      setAlert({ type: 'success', message: 'CreateCreate Success!' });
      setTimeout(() => {
        setAlert(null); // Xóa thông báo
    }, 2000);
    } catch (error) {
      
      setAlert({ type: 'error', message: 'CreateCreate error!' });
      setTimeout(() => {
        setAlert(null); // Xóa thông báo
    }, 2000);
    }
    
  }
useEffect(()=>{
  fetchFood();
  fetchCategories();
  
},[page,Food])
    const deleteFood = async () => {
     
      try {
      const response = await axiosConfig.delete(`user/food/deleteFood/${foodIdToDelete}`);
      
      // Kiểm tra nếu phản hồi thành công
     if (response.status === 200) { // Hoặc kiểm tra dựa vào cấu trúc phản hồi
     setAlert({ type: 'success', message: 'Delete Success!' });
       setTimeout(() => {
      setAlert(null); // Xóa thông báo
      }, 2000);
      }
       } catch (error) {
      // Kiểm tra loại lỗi và hiển thị thông báo phù hợp
    if (error.response && error.response.status === 409) { // Giả sử lỗi 409 cho khóa ngoại
     setAlert({ type: 'error', message: 'This dish cannot be deleted because it contains variant dishes.' });
     } else {
     setAlert({ type: 'error', message: 'Delete error!' });
     }
     setTimeout(() => {
      setAlert(null); // Xóa thông báo
      }, 2000);
       }
     
      };
      
  const edit=async (item)=>{
    
  navigate('/admin/addFood',{state:item})
  }
  const deleteCategory = async(index)=>{
    if (window.confirm("Are you sure you want to delete this food?")){
      try {
        await axiosConfig.delete(`categories/${index}`)
        setAlert({ type: 'success', message: 'Delete Success!' });
        setTimeout(() => {
          setAlert(null); // Xóa thông báo
      }, 2000);
      } catch (error) {
        setAlert({ type: 'error', message: 'Delete error!' });
        setTimeout(() => {
          setAlert(null); // Xóa thông báo
      }, 2000);
      }
    }
   
  }
if(categories == null)
{
  return null;
}
    return (
        <div className="body">
          
          {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
             <div className="container mt-5">
      <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block1-col">
          <div className="tm-bg-primary-dark tm-block1 tm-block1-products col-sm-12">
            <div className="tm-product-table-container">
              <table className="table table-hover tm-table-small tm-product-table revenue-table">
                <thead>
                  <tr>
                  <th className='food-no'>#</th>
                  <th className='food-no'>FOOD NO.</th>
                    <th scope="col">FOOD NAME</th>
                    <th scope="col">BASE PRICE</th>
                    <th scope="">IMAGE</th>
                    <th scope="col">CREATED AT</th>                  
                    <th scope="col">DISCOUNT</th>
                    
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
                       
                    <td className='food-no'>{index +1}</td>
                    <td>{item.foodId}</td>
                    <td className="tm-product-name">{item.foodName}</td>
                    <td>{item.basePrice.toLocaleString("vi-VN")}đ</td>
                    <td className='tm-product-name'  onClick={() => handleRowClick(item)}><img src={`${item.imageUrl}`}/></td>
                    <td>  {(() => {
                      const orderDate = new Date(item.createdAt);
                      return `${orderDate.getFullYear()}/${String(orderDate.getMonth() + 1).padStart(2, '0')}/${String(orderDate.getDate()).padStart(2, '0')}`;
                  })()}</td>
                   
                    
                    <td>{item.discount}%</td>
                    
                    <td><i onClick={()=> edit (item)} style={{ cursor: 'pointer' }} className="fa-solid fa-circle-info fa-lg"></i></td>
                    
                    
                    <td>
                      <button className="tm-product-delete-link">
                        <i onClick={()=>handleOpenModal(item.foodId)} className="far fa-trash-alt tm-product-delete-icon"></i>
                      </button>
                    </td>
                  </tr>
                    ))
                  }  
                  
                 
                </tbody>
                <Link
             to="/admin/addFood"
              className="btn btn-primary btn-block text-uppercase mb-3">Add Food</Link>
            
              </table>
              <ConfirmDeleteModal
        isOpen={isOpenDelete}
        onRequestClose={() => setOpenDelete(false)}
        onConfirm={deleteFood} // Khi xác nhận xóa
      />
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
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block1-col">
          <div className="tm-bg-primary-dark tm-block1 tm-block-product-categories">
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
                <button onClick={handleAddCategory} className="btn btn-primary btn-block text-uppercase mb-3">
              Add new category
            </button>
              </table>
              <input value={inputCategory} onChange={(e)=>  setInputCategory(e.target.value)} placeholder='Category name' type='text' className='category-text'/>
            </div>
          
          </div>
          
        </div>
      </div>
    </div>
        </div>
    );
};

export default FoodList;