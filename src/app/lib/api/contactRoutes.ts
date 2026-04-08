import axios from "axios";
import axiosInstance from "../axiosInstance";

export const contactUs = async (formObj: any) => {
  try {
    const response = await axiosInstance.post("/user/contact-us", formObj);
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
