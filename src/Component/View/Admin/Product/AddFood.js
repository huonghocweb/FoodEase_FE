import React,{useState,useEffect} from "react";
import './AddFood.css';
import axiosConfig from "../../../Config/AxiosConfig";
import { useForm } from 'react-hook-form';
import {Link,useLocation} from 'react-router-dom'
const AddFood =()=>{
    const [categories,setCategories]=useState([]);
    const [foodName,setFoodName]=useState('');
    const [description,setdescription]=useState('');
    const [basePrice,setbasePrice]=useState(0);
    const [discount,setdiscount]=useState(0);
    const [file,setFile]=useState(null);
    const [categoriesId,setcategoriesId]=useState(1);
    const { register, handleSubmit, errors } = useForm();
    const location = useLocation();
    const item = location.state || {};
    const fetchCategories= async ()=>{
        await axiosConfig.get(`/categories/findAll`)
        .then(response =>{
            setCategories(response.data);
            console.log(response.data);
        })
    }
   
    const handleAdd = async (e) => {
        e.preventDefault();
    
      
        const formData=new FormData();
        if(file)
        {
            formData.append('file', file);
        } 
        formData.append('foodName',foodName);
        formData.append('description',description);
        formData.append('basePrice',basePrice);
        formData.append('categoriesId',categoriesId);
        formData.append('discount',discount);
        
        try {
            const response = await axiosConfig.post('/user/food/addFood',formData,
               { headers: {
                'Content-Type': 'multipart/form-data'
            }}
            
            );
           
            console.log('Added successfully',response);
        } catch (error) {
          
            console.log('Error in adding product');
        }
    };
    const handleUpdate = async (e)=>{
      e.preventDefault();
    
      
      const formData=new FormData();
      if(file)
      {
          formData.append('file', file);
      } 
      formData.append('foodName',foodName);
      formData.append('description',description);
      formData.append('basePrice',basePrice);
      formData.append('categoriesId',categoriesId);
      formData.append('discount',discount);
      
      try {
          const response = await axiosConfig.put(`/user/food/updateFood/${item.foodId}`,formData,
             { headers: {
              'Content-Type': 'multipart/form-data'
          }}
          
          );
         
          console.log('Added successfully',response);
      } catch (error) {
        
          console.log('Error in adding product');
      }
    }
    const reset = ()=>{
      setFoodName('');
      setdescription('');
      setbasePrice('');
      setdiscount('');
      setFile(null);
    }
    useEffect (()=>{
        fetchCategories();
        if (item) {
          setFoodName(item.foodName);
          setdescription(item.description);
          setbasePrice(item.basePrice);
          setdiscount(item.discount);
          setcategoriesId(item.categoryId)
          console.log(item)
      }
    },[])
    return (
        <div className="form-container">
        <h2>Food Form</h2>
        <form className="form">
        <button onClick={reset} className="food-Reset">Reset</button>
          <label className="lable">Food Name:</label>
          <input className="input-field" type="text"   name="foodName"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)} placeholder="Enter Food Name" />
    
          <label className="lable">Description:</label>
          <textarea className="textarea-field" id="description"   name="description"
        value={description}
        onChange={(e) => setdescription(e.target.value)} rows="4"></textarea>
    
          <label className="lable">Base Price:</label>
          <input className="input-field" type="number"   name="basePrice"
        value={basePrice}
        onChange={(e) => setbasePrice(e.target.value)} placeholder="Enter Base Price" />
    
          <label className="lable">Image:</label>
          <input className="input-field" type="file"
        name="file"
        onChange={(e) => setFile(e.target.files[0])} />
    
          <label className="lable">Discount:</label>
          <input className="input-field" type="number"   name="discount"
        value={discount}
        onChange={(e) => setdiscount(e.target.value)} placeholder="Enter Discount" />
    
                    <label for="category" class="label">Category:</label>
            <select name="foodCategoriesID" onChange={(e) => setcategoriesId(e.target.value)} class="input-field">
                {
                    categories.map((item)=>(
                        <option key={item.foodCategoriesID}    value={item.foodCategoriesID}
                       >{item.foodCategoriesName}</option>
                    ))
                }
                
               
            </select>
            {item ? (
                <button onClick={handleUpdate} className="submit-button" type="button">
                    Update
                </button>
            ) : (
                <button onClick={handleAdd} className="submit-button" type="button">
                    Submit
                </button>
            )} 
        </form>
      </div>
    );
}
export default AddFood;