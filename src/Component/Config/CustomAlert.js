import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './CustomAlert.css';

const CustomAlert = ({ type, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); 
        }, 2500); 
        return () => clearTimeout(timer); 
    }, [onClose]);

    return (
        <div className={`custom-alert custom-alert-${type}`}>
            <div className="custom-alert-icon">
                {type === 'success' ? (
                    <i className="fa fa-check-circle" style={{ fontSize: '45px' }}></i>
                ) : (
                    <i className="fa fa-times-circle" style={{ fontSize: '45px' }}></i>
                )}
            </div>
            <div className="custom-alert-message">
                {message}
            </div>
            <div className="progress-bar"></div>
        </div>
    );
};

CustomAlert.propTypes = {
    type: PropTypes.oneOf(['success', 'error']).isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CustomAlert;
