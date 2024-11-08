import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// import './ConfirmCode.css';

const ConfirmCode = () => {
    const [code, setCode] = useState('');
    const [isCodeValid, setIsCodeValid] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCode(value);

        // Kiểm tra định dạng mã (5 chữ số)
        const codeRegex = /^\d{5}$/;
        setIsCodeValid(codeRegex.test(value));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        if (!isCodeValid || code === '') {
            alert('Please enter a valid 5-digit code.');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/user/confirm-registration-code', {
                token: code,
                email,
            });
            
            // In phản hồi ra console để kiểm tra
            console.log(response.data);
    
            // Kiểm tra nếu phản hồi có chứa `success` và `message`
            if (response.data.success) {
                alert('Code confirmed successfully!');
                navigate('/create-user', { state: { email } });
            } else if (response.data.message) {
                alert(response.data.message);
            } else {
                alert('Unexpected error: No message from server.');
            }
        } catch (error) {
            // Kiểm tra chi tiết lỗi từ phản hồi
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || 'Invalid or expired code.';
            alert(errorMessage);
        }
    };
    
    

    return (
        <div className="confirm-code-container">
            <div className="confirm-code-box">
                <h2 className="confirm-code-title">Verify Your Code</h2>
                <p className="confirm-code-subtitle">Enter the 5-digit code sent to {email}</p>

                <input
                    type="text"
                    className={`confirm-code-input ${isCodeValid ? '' : 'invalid-input'}`}
                    placeholder="Enter Code"
                    value={code}
                    onChange={handleInputChange}
                />
                {!isCodeValid && <p className="error-message">Please enter a valid 5-digit code.</p>}

                <button
                    className="confirm-code-button"
                    onClick={handleConfirm}
                    disabled={!isCodeValid || code === ''}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConfirmCode;
