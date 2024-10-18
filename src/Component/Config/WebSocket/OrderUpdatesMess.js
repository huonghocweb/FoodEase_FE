import React, { useEffect, useState } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './OrderUpdatesMess.css'


const OrderUpdatesMess = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(socket);
    
        stompClient.connect({}, () => {
          stompClient.subscribe('/topic/orderUpdates', (message) => {
            setMessages((prevMessages) => [...prevMessages, message.body]);
          });
        });
    
        return () => {
          if (stompClient) {
            stompClient.disconnect();
          }
        };
      }, []);
    
      return (
        <div>
          <h2>Order Updates : </h2>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      );
};

export default OrderUpdatesMess;