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
            // Gửi yêu cầu xác nhận mã
            const response = await axios.post('http://localhost:8080/api/user/confirm-reset-password', {
                token: code,
                action: 'yes',
            });

            if (response.data.success) {
                alert('Code confirmed successfully!');
                navigate('/create-user', { state: { email } });
            } else {
                alert('Failed to confirm code. Please try again.');
            }
        } catch (error) {
            alert('Invalid or expired code.');
            console.error('Error:', error);
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
