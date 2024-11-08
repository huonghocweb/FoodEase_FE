import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResetPasswordConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');
        const action = queryParams.get('action');

        if (token && action) {
            confirmResetPassword(token, action);
        }
    }, [location]);

    const confirmResetPassword = async (token, action) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/confirm-reset-password', {
                token,
                action
            });

            if (response.data.success) {
                if (action === 'yes') {
                    navigate('/set-new-password');
                } else {
                    navigate('/reset-password');
                }
            } else {
                alert(response.data.message || 'Confirmation failed!');
                navigate('/reset-password');
            }
        } catch (error) {
            console.error('Error confirming reset password:', error);
            alert('Error processing confirmation!');
            navigate('/reset-password');
        }
    };

    return (
        <div>
            <h2>Processing your confirmation...</h2>
        </div>
    );
};

export default ResetPasswordConfirm;
