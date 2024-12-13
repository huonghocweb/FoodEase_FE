import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr"; // Thư viện jsQR để quét mã QR
import './QrScanner.css';

const QrScanner = ({ onQrScanResult }) => {
  const [qrResult, setQrResult] = useState(null); // Kết quả quét mã QR
  const [isModalOpen, setIsModalOpen] = useState(true); // Quản lý trạng thái modal mở tự động
  const videoRef = useRef(null); // Tham chiếu tới phần tử video
  const canvasRef = useRef(null); // Tham chiếu tới canvas để vẽ ảnh

  // Hàm khởi tạo và quét mã QR liên tục
  const startScanning = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (video && canvas && context) {
      // Chạy video liên tục và quét mã QR mỗi khi có frame mới
      const scanInterval = setInterval(() => {
        if (video.readyState >= video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height);

          // Kiểm tra nếu mã QR được quét thành công
          if (code) {
            setQrResult(code.data); // Lưu lại kết quả quét được
            clearInterval(scanInterval); // Dừng quét khi mã QR được quét thành công
            setIsModalOpen(false);
            // Trả kết quả ra ngoài qua callback
            if (onQrScanResult) {
              onQrScanResult(code.data);
            }
          }
        }
      }, 300); // Quét mỗi 300ms (tăng tốc độ quét)

      return scanInterval;
    }
  };

  // Hàm render video và canvas
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Truy cập vào webcam và bắt đầu quét
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          video.srcObject = stream; // Kết nối webcam với video

          // Đảm bảo gọi video.play() sau khi stream đã sẵn sàng
          video.onloadeddata = () => {
            video.play(); // Chạy video chỉ khi dữ liệu đã tải xong
            const scanInterval = startScanning(); // Bắt đầu quét sau khi kết nối webcam

            // Dọn dẹp interval khi component unmount
            return () => clearInterval(scanInterval);
          };
        })
        .catch((err) => console.error("Error accessing webcam: ", err));
    }
  }, []); // Chạy một lần khi component được mount

  return (
    <div>
      {/* Modal chứa video */}
      <div className={`qr-scanner-modal ${isModalOpen ? "open" : ""}`}>
        <div className="qr-scanner-modal-content">
          <button className="qr-scanner-close-btn" onClick={() => setIsModalOpen(false)}>
            X
          </button>

          {/* Phần tử video để hiển thị webcam */}
          <div className="qr-scanner-video-container">
            <video
              ref={videoRef}
              width="100%" // Đặt chiều rộng của video để chiếm toàn bộ không gian
              height="100%"
              style={{ border: "1px solid black", display: "block", margin: "0 auto" }} // Căn giữa video
            />
          </div>

          {/* Hiển thị kết quả quét mã QR trong modal */}
          {qrResult && <p className="qr-result">QR Code result: {qrResult}</p>}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default QrScanner;
