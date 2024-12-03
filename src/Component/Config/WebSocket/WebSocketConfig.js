import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

const WebSocketConfig = () => {
    const [messageHistory, setMessageHistory] = useState([]); // Lưu cặp tin nhắn
    const [inputMessage, setInputMessage] = useState(''); // Tin nhắn từ người dùng
    const [stompClient, setStompClient] = useState(null);
  
    useEffect(() => {
        // Thiết lập kết nối WebSocket chỉ khi stompClient chưa được kết nối
        if (!stompClient) {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);
          
            // Kết nối client Stomp tới server
            client.connect({}, () => {
              console.log('Kết nối WebSocket thành công');
              
              // Đăng ký để nhận tin nhắn từ server
              client.subscribe('/topic/messages', (message) => {
                const receivedMessage = message.body;

                // Thêm tin nhắn nhận được vào messageHistory
                setMessageHistory(prevHistory => {
                  const lastMessage = prevHistory[prevHistory.length - 1];
                  // Nếu tin nhắn cuối cùng là tin nhắn đã gửi, ghép nó với tin nhắn nhận được mới
                  if (lastMessage && lastMessage.sentMessage && !lastMessage.receivedMessage) {
                    return [
                      ...prevHistory.slice(0, -1),
                      { ...lastMessage, receivedMessage } // Cập nhật mục cuối cùng với tin nhắn nhận được
                    ];
                  }
                  return [...prevHistory, { sentMessage: inputMessage, receivedMessage: null }];
                });
                console.log(receivedMessage);
              });
              
              setStompClient(client); 
            }, (error) => {
              console.log('Kết nối WebSocket thất bại: ', error);
            });
        }

        // Ngắt kết nối khi component bị hủy
        return () => {
          if (stompClient && stompClient.connected) {
            stompClient.disconnect();
            console.log('Ngắt kết nối WebSocket');
          }
        };
    }, [stompClient]);
    
    // Hàm gửi tin nhắn tới backend
    const sendMessage = () => {
        if (stompClient && stompClient.connected && inputMessage.trim() !== '') {
          stompClient.send('/app/messages', {}, inputMessage);
          
          // Thêm tin nhắn đã gửi vào messageHistory
          setMessageHistory(prevHistory => [
            ...prevHistory,
            { sentMessage: inputMessage, receivedMessage: null }
          ]);
          setInputMessage(''); 
        } else {
          console.log('Không thể gửi tin nhắn: Chưa có kết nối WebSocket');
        }
    };
  
    return (
      <>
        <div id="container">
          <aside>
            <header>
              <input type="text" placeholder="Tìm kiếm"/>
            </header>
            <ul>
              <li>
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
                <div>
                  <h2>Prénom Nom</h2>
                  <h3>
                    <span className="status orange"></span>
                    offline
                  </h3>
                </div>
              </li>
            </ul>
          </aside>
          <main>
            <header>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg" alt=""/>
              <div>
                <h2>Trò chuyện với Vincent Porter</h2>
                <h3>đã có 1902 tin nhắn</h3>
              </div>
              <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
            </header>
            <ul id="chat">
              {messageHistory.map((message, index) => (
                <li key={index} className={message.sentMessage ? "me" : "you"}>
                  <div className="entete">
                    <h3>10:12AM, Hôm nay</h3>
                    <h2>{message.sentMessage ? 'Vincent' : 'Admin'}</h2>
                    <span className="status blue"></span>
                  </div>
                  {message.sentMessage && (
                    <div className="message">{message.sentMessage}</div>
                  )}
                  {message.receivedMessage && (
                    <div className="message">{message.receivedMessage}</div>
                  )}
                </li>
              ))}
            </ul>
            <footer>
              <textarea 
                  type="text" 
                  value={inputMessage} 
                  onChange={(e) => setInputMessage(e.target.value)} 
                  placeholder="Nhập tin nhắn" 
              />
              <button onClick={sendMessage}>Gửi Tin nhắn</button>
            </footer>
          </main>
        </div>   
      </>
    );
};

export default WebSocketConfig;
