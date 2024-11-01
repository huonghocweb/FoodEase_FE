import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { customTranslate } from "../../../../i18n";
import CustomAlert from '../../../Config/CustomAlert';
import './Login.css';

const Login = () => {
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        remember: false,
        showPassword: false
    });
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCredentials({
            ...credentials,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const togglePasswordVisibility = () => {
        setCredentials({
            ...credentials,
            showPassword: !credentials.showPassword
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { username, password, remember } = credentials;
            const resToken = await axios.post('http://localhost:8080/api/authenticate', { username, password });

            if (resToken) {
                const { jwtToken, userId, roles } = resToken.data.data;

                // Lưu thông tin đăng nhập dựa vào lựa chọn "Remember Me"
                if (remember) {
                    // Lưu vào localStorage
                    localStorage.setItem('jwtToken', jwtToken);
                    localStorage.setItem('userIdLogin', userId);
                    localStorage.setItem('userNameLogin', username);
                    localStorage.setItem('rolesLogin', JSON.stringify(roles));
                } else {
                    // Lưu vào sessionStorage
                    sessionStorage.setItem('jwtToken', jwtToken);
                    sessionStorage.setItem('userIdLogin', userId);
                    sessionStorage.setItem('userNameLogin', username);
                    sessionStorage.setItem('rolesLogin', JSON.stringify(roles));
                }

                setAlert({ type: 'success', message: 'Login Success!' });
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Login Failed!' });
            console.error('Error in login', error);
        }
    };

    const { username, password, remember, showPassword } = credentials;

    return (
        <div className="login-container">
            {alert && (
                <CustomAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">{customTranslate("Login Form")}</h2>
                    <div className="text-center mb-5 text-dark">Ngon trên từng ngon tay</div>
                    <div className="login-card my-5">
                        <form className="card-body login-cardbody-color p-lg-5" onSubmit={handleSubmit}>
                            <div className="text-center">
                                <img
                                    src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                                    className="img-fluid login-profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px"
                                    alt="profile"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                    placeholder={customTranslate("User Name")}
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    placeholder={customTranslate("Password")}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="position-absolute top-50 end-0 translate-middle-y me-3"
                                    style={{ cursor: 'pointer' }}
                                >
                                    {showPassword ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.5 8a5.5 5.5 0 0 0-10.708-2.5l1.43 1.43A4 4 0 1 1 4 8a3.99 3.99 0 0 1 .5-1.5l-.707-.707A5.49 5.49 0 0 0 0 8a5.5 5.5 0 0 0 10.293 3.293L11 13.293A5.5 5.5 0 0 0 13.5 8zM15 8a5.5 5.5 0 0 0-10.293 3.293L11 13.293A5.5 5.5 0 0 0 15 8z" />
                                            <path d="M1.5 1.5L14.5 14.5" />
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M8 3.5a5.5 5.5 0 0 0 0 9 5.5 5.5 0 0 0 0-9zM8 0c3.15 0 5.78 1.43 7.5 3.5C14.78 5.57 8 8 8 8s-6.78-2.43-7.5-4.5C2.22 1.43 4.85 0 8 0z" />
                                        </svg>
                                    }
                                </span>
                            </div>
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="remember"
                                    name="remember"
                                    checked={remember}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="remember">
                                    {customTranslate("Remember me")}
                                </label>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn login-btn-color px-5 mb-5 w-100">
                                    {customTranslate("Login")}
                                </button>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                {customTranslate("Forgot your password?")}
                                <a
                                    href="#"
                                    className="text-dark fw-bold"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/reset-password');
                                    }}
                                >
                                    {customTranslate("Reset Password")}
                                </a>
                            </div>
                            <div className="form-text text-center mb-5 text-dark">
                                {customTranslate("Not Registered?")}
                                <a
                                    href="#"
                                    className="text-dark fw-bold"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate('/create-account'); // Chuyển hướng đến trang mới
                                    }}
                                >
                                    {customTranslate("Create an Account")}
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
