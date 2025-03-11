import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Backend API URL
  withCredentials: true, // Allows cookies (for secure JWT handling)
});

export default axiosInstance;
