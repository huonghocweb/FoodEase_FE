import React from 'react';
import './ReturnRequestForm.css';

const OrderReturnFormPopUp = ({ openOrderReturnForm, isOpenReturnForm, register, handleSubmit, handleReturnRequestOrder }) => {
    return (
        <>
            {isOpenReturnForm && (
                <div className="return-request-popup-overlay">
                    <div className="return-request-popup">
                        <form onSubmit={handleSubmit(handleReturnRequestOrder)}>
                            <h2>Please let us know your Reason</h2>
                            <textarea
                                className="comment-box"
                                placeholder="Add a Reason..."
                                style={{ width: '100%', height: '120px', fontSize: '20px' }}
                                {...register('reason')}
                            ></textarea>
                            <div className="form-group">
                                <label>Status:</label>
                                <input
                                    className="status-input"
                                    value="pending"
                                    readOnly
                                    {...register('status')}
                                />
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                            <button
                                className="cancel-btn"
                                onClick={(e) => { e.preventDefault(); openOrderReturnForm(); }}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderReturnFormPopUp;
