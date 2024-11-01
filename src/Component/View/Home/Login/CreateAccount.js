import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    const handleNext = async (e) => {
        e.preventDefault();
        if (!isEmailValid || email === '') return;

        setIsLoading(true);
        try {
            // Gửi yêu cầu gửi mã xác thực
            const response = await axios.post('http://localhost:8080/api/user/request-reset-password', { email });

            if (response.data.success) {
                alert('Verification code has been sent to your email!');
                // Điều hướng đến ConfirmCode cùng với email đã gửi
                navigate('/confirm-code', { state: { email } });
            } else {
                alert('Failed to send verification code.');
            }
        } catch (error) {
            alert('Failed to send verification code. Please try again.');
            console.error('Error:', error);
        }
        setIsLoading(false);
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="create-account-container">
            <div className="create-account-box">
                <h2 className="create-account-title">Create FoodEase</h2>
                <p className="create-account-subtitle">Use your Account</p>

                <input
                    type="email"
                    className={`create-account-input ${isEmailValid ? '' : 'invalid-input'}`}
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                />
                {!isEmailValid && <p className="error-message">Please enter a valid email address.</p>}

                <button
                    className="create-account-button"
                    onClick={handleNext}
                    disabled={!isEmailValid || email === '' || isLoading}
                >
                    {isLoading ? 'Sending...' : 'Next'}
                </button>

                <button
                    className="create-account-button back-button"
                    onClick={handleBack}
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
