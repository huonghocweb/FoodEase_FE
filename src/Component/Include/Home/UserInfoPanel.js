import React from 'react';
import './UserInfoPanel.css';

const UserInfoPanel = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="user-info-panel show">
      <div className="user-info-header">
        <h3>User Information</h3>
        <button onClick={onClose} className="close-btn">✖</button>
      </div>
      <div className="user-info-content">
        <img src={user.imageUrl} alt="User Avatar" className="user-avatar"/>
        
        <div className="info-item">
          <strong>Account Name:</strong> <span>{user.userName}</span>
        </div>
        <div className="info-item">
          <strong>Full Name:</strong> <span>{user.fullName}</span>
        </div>
        <div className="info-item">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="info-item">
          <strong>Phone:</strong> <span>{user.phoneNumber}</span>
        </div>
        <div className="info-item">
          <strong>Address:</strong> <span>{user.address}</span>
        </div>
        <div className="info-item">
          <strong>Birthday:</strong> <span>{user.birthday}</span>
        </div>
        <div className="info-item">
          <strong>Gender:</strong> <span>{user.gender ? 'Male' : 'Female'}</span>
        </div>
        <div className="info-item">
          <strong>Role:</strong> <span>{user.roles.map(role => role.roleName).join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPanel;
