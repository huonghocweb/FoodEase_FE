import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ConfirmCode.css';

const ConfirmCode = () => {
    const [code, setCode] = useState(['', '', '', '', '']);
    const [isCodeValid, setIsCodeValid] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {  // Only allow single digit
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);
            setIsCodeValid(newCode.every(digit => digit !== ''));

            // Move to the next input if current input is filled
            if (value && index < code.length - 1) {
                document.getElementById(`code-input-${index + 1}`).focus();
            }
        }
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        const codeString = code.join('');
        if (!isCodeValid || codeString.length !== 5) {
            alert('Please enter a valid 5-digit code.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/user/confirm-registration-code', {
                token: codeString,
                email,
            });

            if (response.data.success) {
                alert('Code confirmed successfully!');
                navigate('/create-user', { state: { email, token: codeString } });
            } else {
                alert(response.data.message || 'Invalid or expired code.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to confirm code. Please try again.');
        }
    };

    return (
        <div className="confirm-code-container">
            <div className="confirm-code-box">
                <h2 className="confirm-code-title">Verify Your Code</h2>
                <p className="confirm-code-subtitle">Enter the 5-digit code sent to {email}</p>

                <div className="confirm-code-inputs">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-input-${index}`}
                            type="text"
                            className={`confirm-code-input ${isCodeValid ? '' : 'invalid-input'}`}
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    ))}
                </div>
                {!isCodeValid && <p className="error-message">Please enter a valid 5-digit code.</p>}

                <button
                    className="confirm-code-button"
                    onClick={handleConfirm}
                    disabled={!isCodeValid}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConfirmCode;
