import React, { useState, useEffect } from "react";
import './AddFood.css';
import axiosConfig from "../../../Config/AxiosConfig";
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import CustomAlert from "../../../Config/CustomAlert";

const AddFood = () => {
    const [categories, setCategories] = useState([]);
    const [foodName, setFoodName] = useState('');
    const [description, setdescription] = useState('');
    const [basePrice, setbasePrice] = useState(0);
    const [discount, setdiscount] = useState(0);
    const [file, setFile] = useState(null);
    const [categoriesId, setcategoriesId] = useState(1);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const location = useLocation();
    const item = location.state || null;
    const [alert, setAlert] = useState(null); 

    const fetchCategories = async () => {
        await axiosConfig.get(`/categories/findAll`)
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.log('Error fetching categories:', error);
            });
    };

    const handleAdd = async (data) => {
        const formData = new FormData();
        
        if (file) {
            formData.append('file', file);
        }
        formData.append('foodName', data.foodName);
        formData.append('description', data.description);
        formData.append('basePrice', data.basePrice);
        formData.append('categoriesId', categoriesId);
        formData.append('discount', discount);
        
        try {
            const response = await axiosConfig.post('/user/food/addFood', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Added successfully', response);
            setAlert({ type: 'success', message: 'Added Success!' });
        } catch (error) {
            console.log('Error in adding product:', error);
            setAlert({ type: 'error', message: 'Added Failed!' });
        }
    };

    const handleUpdate = async (data) => {
        const formData = new FormData();

        if (file) {
            formData.append('file', file);
        }
        formData.append('foodName', data.foodName);
        formData.append('description', data.description);
        formData.append('basePrice', data.basePrice);
        formData.append('categoriesId', categoriesId);
        formData.append('discount', discount);

        try {
            const response = await axiosConfig.put(`/user/food/updateFood/${item.foodId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('Updated successfully', response);
            setAlert({ type: 'success', message: 'Update Success!' });
        } catch (error) {
            console.log('Error in updating product:', error);
            setAlert({ type: 'error', message: 'update Failed!' });
        }
    };

    const reset = () => {
        setFoodName('');
        setdescription('');
        setbasePrice(0);
        setdiscount(0);
        setFile(null);
    };
const fetchItem= async ()=>{
    if (item) {
        setFoodName(item.foodName);
        setdescription(item.description);
        setbasePrice(item.basePrice);
        setdiscount(item.discount);
        setcategoriesId(item.categoryId);
        setValue("foodName", item.foodName);
        setValue("description", item.description);
        setValue("basePrice", item.basePrice);
        setValue("discount", item.discount);
    }
}
    useEffect(() => {
        fetchCategories();
        fetchItem();
    }, [item]);

    return (
        <div className="add-food">
             {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
            
            <div className="tm-block-col tm-col-account-settings">
                <div className="tm-bg-primary-dark tm-block tm-block-settings">
                    <h2 className="tm-block-title">Food form</h2>
                    <form className="tm-signup-form row" onSubmit={handleSubmit(item ? handleUpdate : handleAdd)}>
                        <div className="form-group col-lg-6">
                            <label>Food Name:</label>
                            <input
                                className="input-field"
                                type="text"
                                {...register("foodName", { required: "Food Name is required" })}
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                placeholder="Enter Food Name"
                            />
                            {errors.foodName && <p className="error">{errors.foodName.message}</p>}
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Description:</label>
                            <textarea
                                className="textarea-field"
                                id="description"
                                {...register("description", { required: "Description is required" })}
                                value={description}
                                onChange={(e) => setdescription(e.target.value)}
                            ></textarea>
                            {errors.description && <p className="error">{errors.description.message}</p>}
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Base Price:</label>
                            <input
                                className="input-field"
                                type="number"
                                {...register("basePrice", { required: "Base Price is required", min: { value: 0, message: "Base Price must be non-negative" } })}
                                value={basePrice}
                                onChange={(e) => setbasePrice(e.target.value)}
                                placeholder="Enter Base Price"
                            />
                            {errors.basePrice && <p className="error">{errors.basePrice.message}</p>}
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Image:</label>
                            <input
                                className="input-field"
                                type="file"
                                {...register("file", { required: "Image is required" })} // Thêm xác thực để yêu cầu nhập file
                                onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    setFile(selectedFile);
                                }}
                            />
                            {errors.file && <p className="error">{errors.file.message}</p>} {/* Hiển thị thông báo lỗi nếu không có file */}
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Discount:</label>
                            <input
                                className="input-field"
                                type="number"
                                name="discount"
                                value={discount}
                                onChange={(e) => setdiscount(e.target.value)}
                                placeholder="Enter Discount"
                            />
                        </div>

                        <div className="form-group col-lg-6">
                            <label>Category:</label>
                            <select name="foodCategoriesID" onChange={(e) => setcategoriesId(e.target.value)} className="input-field">
                                {categories.map((item) => (
                                    <option key={item.foodCategoriesID} value={item.foodCategoriesID}>
                                        {item.foodCategoriesName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-button">
                            <label className="tm-hide-sm">&nbsp;</label>
                            <button className="submit-button" type="submit">{item ? "Update" : "Submit"}</button>
                            <button onClick={reset} className="submit-button" type="button">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;
