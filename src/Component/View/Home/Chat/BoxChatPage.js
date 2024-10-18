import React from 'react';
import BoxChatList from './BoxChatList';
import './BoxChatCss.css';
import WebSocketConfig from '../../../Config/WebSocket/WebSocketConfig';
const BoxChatPage = () => {
    return (
        <div>
        <WebSocketConfig />
        </div>
    );
};

export default BoxChatPage;