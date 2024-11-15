import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy giá trị token từ URL
    const urlParams = new URLSearchParams(location.search);
    const encodedAuthResponse = urlParams.get('token');

    if (encodedAuthResponse) {
      // Giải mã Base64
      const decodedAuthResponseJson = atob(encodedAuthResponse);

      // Phân tích chuỗi JSON thành đối tượng
      const authResponseObj = JSON.parse(decodedAuthResponseJson);

      // Kiểm tra và sử dụng jwtToken
      console.log(authResponseObj);
      console.log(authResponseObj.jwtToken);
      console.log(authResponseObj.userId);
      console.log(authResponseObj.username);
      console.log(authResponseObj.roles);
      // Lưu token vào localStorage hoặc state
      localStorage.setItem('jwtToken', authResponseObj.jwtToken);
      localStorage.setItem('userIdLogin', authResponseObj.userId);
      localStorage.setItem('userNameLogin', authResponseObj.username);
      localStorage.setItem('rolesLogin', JSON.stringify(authResponseObj.roles));

      // Chuyển hướng người dùng đến trang chủ hoặc trang khác
     navigate('/');
    } else {
      console.log('Token không có trong URL');
    }
  }, [location, navigate]);

  return null;
};

export default OAuthRedirect;
