import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend API URL
  headers: {
    "Content-Type": "application/json", // ✅ Ensure JSON is sent
  },
  withCredentials: true, // Allows cookies (for secure JWT handling)
});

export default axiosInstance;
