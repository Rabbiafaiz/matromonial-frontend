import axios, { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";

// Login API Call
export const login = async (credentials: {
  email: string;
  password: string;
  fcmToken?: string | null;
}) => {
  try {
    const response = await axiosInstance.post("/user/login", credentials);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const socialLogin = async (credentials: any) => {
  try {
    const response = await axiosInstance.post("/user/socialLogin", credentials);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const register = async (credentials: {
  name: string;
  email: string;
  phone: string;
  password: string;
  fcmToken?: string | null;
}) => {
  try {
    const response = await axiosInstance.post("/user/register", credentials);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

export const logout = async (user: any) => {
  try {
    const response = await axiosInstance.post("/user/logout", user);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const forgotPassword = async (user: any) => {
  try {
    const response = await axiosInstance.post("/user/forgotPassword", user);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const verifyOtp = async (data: any) => {
  try {
    const response = await axiosInstance.post("/user/verify-otp", data);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const resetPassword = async (data: any) => {
  try {
    const response = await axiosInstance.post("/user/resetPassword", data);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const completeProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.put("/user/completeProfile", formData);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const verifyEmail = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/user/verifyEmail", formData);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const confirmEmail = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/user/confirmEmail", formData);

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

// Fetch Authenticated User
export const getUser = async () => {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
};
