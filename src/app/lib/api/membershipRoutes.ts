import axios from "axios";
import axiosInstance from "../axiosInstance";


export const getPlansList = async () => {
  try {
    const response = await axiosInstance.get("/user/getSubscription");

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const createPaymentCheckout = async (formObj: any) => {
  try {
    const cashfreeMode =
      process.env.NEXT_PUBLIC_CASHFREE_MODE === "sandbox"
        ? "sandbox"
        : "production";
    const endpoint =
      cashfreeMode === "sandbox" ? "/create-test-order" : "/create-order";
    const response = await axiosInstance.post(endpoint, formObj);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const verifyPayment = async (formObj: any) => {
  try {
    const response = await axiosInstance.post("/verify-payment", formObj);

    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
