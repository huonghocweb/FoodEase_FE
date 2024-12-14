// ConfirmDeleteModal.js
import React from 'react';
import Modal from 'react-modal'; // Bạn cần cài đặt react-modal nếu chưa có
import './ConfirmCss.css'
const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm(); // Gọi lại hàm xác nhận
    onRequestClose(); // Đóng modal
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>Confirm Deletion</h2>
      <p>Are you sure you want to delete this food item? This action cannot be undone.</p>
      <button onClick={onRequestClose}>No</button>
      <button onClick={handleConfirm}>Yes</button>
    </Modal>
  );
};

export default ConfirmDeleteModal;
