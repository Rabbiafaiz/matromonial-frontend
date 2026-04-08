import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../components/ui/CustomToast";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? Cookies.get("token") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        // showToast("Unauthorized! Please login again", "error");
        if (!window.location.pathname.includes("auth"))
          window.location.replace("/auth/login");
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
