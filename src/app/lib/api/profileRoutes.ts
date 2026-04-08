import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getUserDetails = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/user/userDetails/${id}`);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const updateUserProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.put(`/user/updateProfile`, formData);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const deleteUserProfile = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`/user/deleteAccount`, formData);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const uploadFile = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`/user/uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getAllDropdownsData = async () => {
  try {
    const response = await axiosInstance.get(`/user/get-all-dropdown-options`);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
