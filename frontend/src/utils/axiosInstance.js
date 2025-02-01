import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL || "https://intellichat-server.vercel.app", // Ensure you have VITE_BASE_URL in your .env file
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Authorization header if token exists
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
