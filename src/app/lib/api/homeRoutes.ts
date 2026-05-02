import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getNewUsers = async (page?: number, limit?: number) => {
  try {
    const query = new URLSearchParams();
    if (typeof page === "number") query.set("page", String(page));
    if (typeof limit === "number") query.set("limit", String(limit));
    const response = await axiosInstance.get(
      `/user/newUsers${query.toString() ? `?${query.toString()}` : ""}`,
    );
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
export const getMatchUsers = async (
  matchType: string,
  page?: number,
  limit?: number
) => {
  try {
    const query = new URLSearchParams({ matchType });
    if (typeof page === "number") query.set("page", String(page));
    if (typeof limit === "number") query.set("limit", String(limit));

    const response = await axiosInstance.get(`/user/userMatch?${query.toString()}`);
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
export const getNotificationsList = async () => {
  try {
    const response = await axiosInstance.get("/user/getNotifications");
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
