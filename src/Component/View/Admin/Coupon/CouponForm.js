import React, { useState } from 'react';

const CouponForm = ({register, handleSubmit,handleImage, fileInputRef , reset , submitCoupon ,couponId , errors , imageCoupon }) => {
  const [selectedImage, setSelectedImage] = useState(null);

    // Hàm xử lý khi người dùng chọn một ảnh mới
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setSelectedImage(imageUrl); 
        }
    }; 
  return (
        <>
         <div className="body">
            <div className="container mt-5">
        <div className="row tm-content-row">
          <div className="col-10 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-h-auto">
              <h2 className="tm-block-title">List of Accounts</h2>
              <p className="text-white">Accounts</p>
              <select className="custom-select">
                <option value="0">Select account</option>
                <option value="1">Admin</option>
                <option value="2">Editor</option>
                <option value="3">Merchant</option>
                <option value="4">Customer</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row tm-content-row">
          <div className="tm-block-col tm-col-avatar">
            <div className="tm-bg-primary-dark tm-block tm-block-avatar">
              <h2 className="tm-block-title">Change Image</h2>
              <div className="tm-avatar-container">
                <img
                  src={selectedImage ? selectedImage : imageCoupon}
                  alt="Avatar"
                  className="tm-avatar img-fluid mb-4"
                />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange}/>
            </div>
          </div>
          <div className="tm-block-col tm-col-account-settings">
            <div className="tm-bg-primary-dark tm-block tm-block-settings">
              <h2 className="tm-block-title">Coupon Settings</h2>
              <form onSubmit={handleSubmit(submitCoupon)} className="tm-signup-form row">
                <div className="form-group col-lg-6">
                  <label >Description</label>
                  <input
                    type="text"
                    className="form-control validate"
                    {...register('description',{required :'Description is required'})}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label >Code </label>
                  <input
                    className="form-control validate"
                    {...register('code',{required :true})}
                  />
                </div>
                <div className="form-group col-lg-6">
                    <label>Discount Percent</label>
                    <input
                      type="number"
                      className="form-control validate"
                      {...register('discountPercent', {
                        required: 'Discount Percent is required',
                        min: { value: 0, message: 'Discount Percent must be at least 0' }, 
                        max: { value: 100, message: 'Discount Percent must be less than 100' }
                      })}
                    />
                  {errors?.discountPercent && (
                    <p style={{color : 'red' , fontSize : '16px'}}>{errors?.discountPercent.message}</p>
                  )}
                  </div>

                <div className="form-group col-lg-6">
                  <label >Max Discount Amount (VNĐ)</label>
                  <input
                  type='number'
                    className="form-control validate"
                    {...register('maxDiscountAmount',{
                      required :'MaxDiscountAmount is required',
                      min : {value : 0 , message : 'Min discount amount must be at least 0'}
                      })}
                  />
                  {errors?.maxDiscountAmount && (
                    <p style={{color : 'red' , fontSize : '16px'}}>{errors?.maxDiscountAmount.message}</p>
                  )}
                </div>
                <div className="form-group col-lg-6">
                  <label >Start Date</label>
                  <input
                    type='date'
                    className="form-control validate"
                    {...register('startDate',{required :true})}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label >End Date</label>
                  <input
                    type="date"
                    className="form-control validate"
                    {...register('endDate',{required :true})}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label >Use Limit</label>
                  <input
                    type='number'
                    className="form-control validate"
                    {...register('useLimit',{
                      required :'Use Limit is required',
                      min : {value : 0 , message : 'Use Limit must be least 0'}
                      })}
                  />
                  {
                    errors?.useLimit && (
                      <p style={{color : 'red' , fontSize : '16px'}}>{errors?.useLimit.message}</p>
                    )
                  }
                </div>
                <div className="form-group col-lg-6">
                  <label >UsedCount</label>
                  <input
                    className="form-control validate"
                    {...register('usedCount',{required :'Used Count is required'})}
                  />
                </div>
                <div className="form-group col-lg-6">
                  <label className="tm-hide-sm">&nbsp;</label>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    {couponId ? 'Update' : 'Create'} 
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>   
        </>
    );
};

export default CouponForm;