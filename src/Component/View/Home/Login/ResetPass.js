import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../../Config/CustomAlert';
import { customTranslate } from "../../../../i18n";
// import './ResetPass.css'; 

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    // Kiểm tra định dạng email hợp lệ
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Kiểm tra định dạng email trước khi gửi request
        if (!isValidEmail(email)) {
            setAlert({ type: 'error', message: 'Invalid email format!' });
            return;
        }

        try {
            // Gửi request đặt lại mật khẩu
            const response = await axios.post(
                'http://localhost:8080/api/user/request-reset-password', 
                { email }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Xử lý phản hồi từ backend
            if (response.data.success) {
                setAlert({ type: 'success', message: 'Check your email for reset instructions!' });
                setTimeout(() => navigate("/set-new-password"), 3000);
            } else {
                setAlert({ type: 'error', message: response.data.message || 'Request failed!' });
            }
        } catch (error) {
            // Xử lý lỗi chi tiết hơn
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                setAlert({ type: 'error', message: error.response.data.message || 'Server error!' });
            } else if (error.request) {
                console.error('No response received from server:', error.request);
                setAlert({ type: 'error', message: 'No response from server!' });
            } else {
                console.error('Error setting up request:', error.message);
                setAlert({ type: 'error', message: 'Error setting up request!' });
            }
        }
    };

    return (
        <div className="container">
            {alert && (
                <CustomAlert 
                    type={alert.type} 
                    message={alert.message} 
                    onClose={() => setAlert(null)} 
                />
            )}
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">{customTranslate("Reset Password")}</h2>
                    <div className="card my-5">
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email}
                                    onChange={handleChange}
                                    placeholder={customTranslate("Enter your email")} 
                                    required 
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                                    {customTranslate("Send Reset Link")}
                                </button>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                {customTranslate("Remember your password?")} 
                                <a 
                                    href="/" 
                                    className="text-dark fw-bold">
                                    {customTranslate("Back to Login")}
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPass;
