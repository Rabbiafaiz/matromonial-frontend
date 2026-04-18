import axios from "axios";
import axiosInstance from "../axiosInstance";

interface SuccessStoriesQueryParams {
  page?: number;
  limit?: number;
}

export const getSuccessStoriesList = async (
  params?: SuccessStoriesQueryParams,
) => {
  try {
    const response = await axiosInstance.get("/user/get-success-stories", {
      params,
    });
    return response; // Return full response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
