import React from 'react';

const ClaimCoupon = ({handleSubmit,register,submitAddCoupon}) => {

    return (
        <>
          <div>
            <div className="container mt-5" style={{paddingTop : '100px'}}>
        <div className="row tm-content-row">
            <div className="tm-bg-primary-dark tm-block ">
              <h2 className="tm-block-title"> Claim Coupon</h2>
              <div className="tm-signup-form row">
              <div className="form-group col-lg-8">
                <div>
                    <img src="/assets/images/claimCoupon.jpg" width={'280px'} />
                </div>
              </div>
              <div className="form-group col-lg-4">
              <form onSubmit={handleSubmit(submitAddCoupon)} >
                <div className="form-group">
                  <label >UserName</label>
                  <input
                    name="username"
                    type="text"
                    className="form-control validate"
                    {...register('userName')}
                   />
                </div>  
                <div className="form-group ">
                  <label>Code</label>
                  <input
                    name="code"
                    type="text"
                    className="form-control validate"
                    {...register('code')}
                    />
                </div>
              <div className="form-group ">
              <label className="tm-hide-sm">&nbsp;</label>
              <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-danger"   >
                  Submit
                </button>
              </div>
            </div>
              </form>
              </div>
              </div>
            </div>
        </div>
      </div>
      </div>  
        </>
    );
};

export default ClaimCoupon;