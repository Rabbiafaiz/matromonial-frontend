import axios from "axios";
import axiosInstance from "../axiosInstance";

export const createChat = async (data: any) => {
  try {
    const response = await axiosInstance.post("/user/createConversation", data);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getAllChats = async () => {
  try {
    const response = await axiosInstance.get("/user/getAllConversation");
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getMessages = async (roomId: any) => {
  try {
    const response = await axiosInstance.get(
      `/user/getMessages?roomId=${roomId}`
    );
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const sendInterest = async (formData: any) => {
  try {
    const response = await axiosInstance.post("/user/sendInterest", formData);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
