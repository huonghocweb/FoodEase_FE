import React from "react";
import { customTranslate } from "../../../i18n";
import "./UserInfoPanel.css";

const UserInfoPanel = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="user-info-panel show">
      <div className="user-info-header">
        <h3>{customTranslate("User Information")}</h3>
        <button onClick={onClose} className="close-btn">
          ✖
        </button>
      </div>
      <div className="user-info-content">
        <img src={user.imageUrl} alt="User Avatar" className="user-avatar" />

        <div className="info-item">
          <strong>{customTranslate("Account Name")}:</strong>{" "}
          <span>{user.userName}</span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Full Name")}:</strong>{" "}
          <span>{user.fullName}</span>
        </div>
        <div className="info-item">
          <strong>Email:</strong> <span>{user.email}</span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Phone")}:</strong>{" "}
          <span>{user.phoneNumber}</span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Address")}:</strong>{" "}
          <span>{user.address}</span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Birthday")}:</strong>{" "}
          <span>{user.birthday}</span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Gender")}:</strong>{" "}
          <span>
            {user.gender ? customTranslate("Male") : customTranslate("Female")}
          </span>
        </div>
        <div className="info-item">
          <strong>{customTranslate("Role")}:</strong>{" "}
          <span>
            {user.roles
              .map((role) => customTranslate(role.roleName))
              .join(", ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPanel;
