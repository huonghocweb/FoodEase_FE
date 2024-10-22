import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Thêm interceptor để chèn token vào header Authorization
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý phản hồi từ server
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Invalid Token"); // Xử lý khi token không hợp lệ
      }
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
