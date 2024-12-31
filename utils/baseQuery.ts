/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the accessToken from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      console.error("Unauthorized access - possibly invalid or expired token");
      // Optionally, you can redirect to the login page or show a message to the user
    }
    return Promise.reject(error);
  }
);

interface BaseQueryArgs {
  url: string;
  method: string;
  body?: any;
  params?: any;
}

export const baseQuery = async ({
  url,
  method,
  body,
  params,
}: BaseQueryArgs) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data: body,
      params,
    });
    return { data: response.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      error: {
        status: axiosError.response?.status,
        data:
          axiosError.response?.data ||
          axiosError.message ||
          "An unexpected error occurred",
      },
    };
  }
};
