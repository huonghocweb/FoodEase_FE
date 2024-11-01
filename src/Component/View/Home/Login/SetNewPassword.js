import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import CustomAlert from '../../../Config/CustomAlert';
import { customTranslate } from "../../../../i18n";
// import './ResetPass.css';

const SetNewPassword = () => {
    const [form, setForm] = useState({ token: '', newPassword: '', confirmPassword: '' });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Lấy token từ URL và tự động điền vào form
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromURL = queryParams.get('token');
        if (tokenFromURL) {
            setForm((prevForm) => ({ ...prevForm, token: tokenFromURL }));
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            setAlert({ type: 'error', message: customTranslate("Passwords do not match!") });
            return;
        }
    
        try {
            // Gửi yêu cầu đặt lại mật khẩu với mã số xác nhận
            await axios.post('http://localhost:8080/api/user/reset-password', {
                token: form.token, // Mã xác nhận
                newPassword: form.newPassword
            });
            setAlert({ type: 'success', message: customTranslate("Password reset successful!") });
            setTimeout(() => navigate("/"), 3000);
        } catch (error) {
            setAlert({ type: 'error', message: customTranslate("Failed to reset password!") });
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
                    <h2 className="text-center text-dark mt-5">{customTranslate("Set New Password")}</h2>
                    <div className="card my-5">
                        <form className="card-body p-lg-5" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="token"
                                    value={form.token}
                                    onChange={handleChange}
                                    placeholder={customTranslate("Enter Code")} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="newPassword"
                                    value={form.newPassword}
                                    onChange={handleChange}
                                    placeholder={customTranslate("New Password")} 
                                    required 
                                />
                            </div>
                            <div className="mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder={customTranslate("Confirm Password")} 
                                    required 
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                                    {customTranslate("Reset Password")}
                                </button>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                {customTranslate("Remember your password?")} 
                                <a href="/" className="text-dark fw-bold">
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

export default SetNewPassword;
