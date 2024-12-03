import React from 'react';
import { customTranslate } from '../../../../i18n';
import OrderUpdatesMess from '../../../Config/WebSocket/OrderUpdatesMess';
import './Notification.css';

const Notification = () => {
    return (
        <div className="notification-container">
            <h2 className="notification-title">{customTranslate("Notification")}</h2>
            <OrderUpdatesMess />
        </div>
    );
};

export default Notification;