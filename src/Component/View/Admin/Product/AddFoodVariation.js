import React, { useState, useEffect } from 'react';
import './AddFoodVariation.css';
import axiosConfig from '../../../Config/AxiosConfig';
import { useForm } from 'react-hook-form';
import CustomAlert from '../../../Config/CustomAlert';

const AddFoodVariation = ({ onClose, item }) => {
    const [foodVariation, setFoodVariation] = useState([]);
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const [edit1,setEdit] =useState();
    const [foodVariationId,setfoodVariationId]= useState(null); 
    const [alert, setAlert] = useState(null); 
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    
    const sizes = [
        { id: 1, name: 'Size S' },
        { id: 2, name: 'Size M' },
        { id: 3, name: 'Size L' }
    ];
    const toppings = [
        { id: 1, name: 'Extra rice' },
        { id: 2, name: 'Spaghetti' },
        { id: 3, name: 'Egg' },
        { id: 4, name: 'Sausage' },
        { id: 5, name: 'Coconut jelly' },
        { id: 6, name: 'Taro jelly' },
        { id: 7, name: 'Matcha jelly' },
        { id: 8, name: 'Strawberry jelly' },
    ];
    
    const [selectedToppings, setSelectedToppings] = useState([]);
    const handleCheckboxChange = (id) => {
        const newToppings = [...selectedToppings];
        const index = newToppings.indexOf(id);
        if (index === -1) {
            newToppings.push(id);
        } else {
            newToppings.splice(index, 1);
        }
        setSelectedToppings(newToppings);
    };
    const fetchFoodVariation = async () => {
        try {
            const response = await axiosConfig.get(`/user/foodvariation/findFoodVariationByFoodId/${item.foodId}`);
            setFoodVariation(response.data);
           
        } catch (error) {
            console.error('Error fetching food variations:', error);
        }
    };

    const handleAdd = async (data) => {
        try {
            const formData = new FormData();

            if (data.file) {
                for (let i = 0; i < data.file.length; i++) {
                    formData.append('file', data.file[i]);
                }
            }

            formData.append('quantityStock', data.quantityStock);
            formData.append('FoodSizeId', data.FoodSizeId);
            
            formData.append('foodId', item.foodId);

            await axiosConfig.post(`/user/foodvariation/AddFoodVariation`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Success: Food variation added');
            // Optionally, you might want to refresh the food variations after adding
            setAlert({ type: 'success', message: 'Added Success!' });
            fetchFoodVariation();
            reset();

        } catch (error) {
            setAlert({ type: 'error', message: 'Added Failed,Size already exists!' });
            console.error('Error:', error);
        }
    };
    const handleUpdate = async (data)=>{
        try {
            const formData = new FormData();

            if (data.file) {
                for (let i = 0; i < data.file.length; i++) {
                    formData.append('file', data.file[i]);
                }
            }

            formData.append('quantityStock', data.quantityStock);
            formData.append('FoodSizeId', data.FoodSizeId);
            
            formData.append('foodId', item.foodId);

            await axiosConfig.put(`/user/foodvariation/updateFoodVariation/${foodVariationId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Success: Food variation added');
            // Optionally, you might want to refresh the food variations after adding
            setAlert({ type: 'success', message: 'Update Success!' });
            fetchFoodVariation();

        } catch (error) {
            setAlert({ type: 'error', message: 'Update Failed!' });
            console.error('Error:', error);
        }
    }
    const edit =async (item)=>{
        
        setValue('quantityStock',item.quantityStock)
        setValue('FoodSizeId',item.foodSize.foodSizeId)
        setValue('foodId',item.foodId)
        setfoodVariationId(item.foodVariationId)
        setEdit(true);
    }
    const reset = async ()=>{
        setValue('quantityStock',0)
        setValue('FoodSizeId',1)
        
    }
    const deleteFoodVariation = async (id)=>{
        try {
            await axiosConfig.delete(`/user/foodvariation/deleteFoodVariation/${id}`)
            setAlert({ type: 'success', message: 'Delete Success!' });
        } catch (error) {
            setAlert({ type: 'error', message: 'Delete Failed!' });
        }
        
    }
    const handleImgClick = (item) => {
        setCurrentItem(item);
        setIsFormOpen(true);
    };
    
      const handleCreateFoodVariationToppings = async () => {
        try {
            const toppings = selectedToppings.map((toppingId) => ({
                foodVariationId: currentItem,
                toppingId: toppingId,
                
            }));
            
            const response = await axiosConfig.post('/user/topping/create', toppings);
            setIsFormOpen(false);
            setAlert({ type: 'success', message: 'Add topping Success!' });
        } catch (error) {
            console.error(error);
            setAlert({ type: 'error', message: 'Add topping error!' });
        }
        
    }; 
    useEffect(() => {
        fetchFoodVariation();
      
    }, [item.foodId,foodVariation]);

    return (
        <div className="modalt">
            <div className="modal-contentt">
                <span className="closet" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit(edit1 ?    handleUpdate :handleAdd)}>
                    <h1>Food variation</h1>
                    <div className='foodvariation-input'>
                        <div >
                        <input className='input-quantity'
                            type="number"
                            placeholder='Quantity stock'
                            {...register('quantityStock', {
                                required: 'Required field',
                                min: { value: 0, message: 'Quantity must be positive' }
                            })}
                        />
                        {errors.quantityStock && <p  className="error">{errors.quantityStock.message}</p>}
                        </div>
                       
                        <div>
                        <select {...register('FoodSizeId', { required: 'Please select a size' })}>
                            <option value="">Select a size</option>
                            {sizes.map(size => (
                                <option key={size.id} value={size.id}>
                                    {size.name}
                                </option>
                            ))}
                        </select>
                        {errors.FoodSizeId && <p  className="error">{errors.FoodSizeId.message}</p>}
                        </div>
                        <div class="file-upload">
                        <label for="file-input" class="custom-file-upload">
                           Chọn ảnh
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            multiple
                            {...register('file', { required: 'Files are required' })}
                            style={{ display: 'none' }}  
                        />
                        {errors.file && <p className="error">{errors.file.message}</p>}
                    </div>
                        

                        <button type="submit">{edit1 ? 'Update': 'Create'}</button>
                        {/* If you want to implement Update functionality, you'll need to handle it appropriately */}
                        
                    </div>
                </form>
                
                {foodVariation.map((varItem, index) => (
                    <div key={index} className="custom-modal-bodyt">
                        <img  onClick={() => handleImgClick(varItem.foodVariationId)}
                            className='order-imaget' 
                            src={varItem.imageUrl ? varItem.imageUrl : varItem.food.imageUrl} 
                            alt="food" 
                        />
                       
                        <div className="order-detailst">
                            
                            <h4>Size: {varItem.foodSize.foodSizeName}</h4>
                            <h4>Quantity: {varItem.quantityStock}</h4>
                            <h4>Discount: {varItem.food.discount}%</h4>
                        </div>
                        
                        <button onClick={()=> edit(varItem)} className='button-edit'>Edit</button>
                        <button onClick={()=> deleteFoodVariation(varItem.foodVariationId)} className='button-delete'>Delete</button>
                    </div>
                ))}
            </div>
            {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
               {isFormOpen && (
    <div className="form-Topping">
        <h2>Tongping</h2>
                    <form onSubmit={(e) => {
                e.preventDefault(); // Ngăn chặn reload trang
                handleCreateFoodVariationToppings(); // Gọi hàm xử lý
            }}>
                <div className="toppings">
                    {toppings.map((topping) => (
                        <div key={topping.id}>
                            <input
                                type="checkbox"
                                checked={selectedToppings.includes(topping.id)}
                                onChange={() => handleCheckboxChange(topping.id)}
                            />
                            <span> {topping.name}</span>
                        </div>
                    ))}
                </div>

                <button type="submit">Add foodVariation</button>
</form>
    </div>
)}
        </div>
    );
};

export default AddFoodVariation;
