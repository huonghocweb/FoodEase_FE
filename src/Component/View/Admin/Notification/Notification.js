import React from 'react';
import './Notification.css';
import OrderUpdatesMess from '../../../Config/WebSocket/OrderUpdatesMess';

const Notification = () => {
    return (
        <div className="notification-container">
            <h2 className="notification-title">Notification</h2>
            <OrderUpdatesMess />
        </div>
    );
};

export default Notification;