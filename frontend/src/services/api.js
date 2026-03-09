import axios from "axios";

const API = axios.create({
  baseURL: "https://paymint-backend-bb44.onrender.com/api",// your Spring Boot port
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;