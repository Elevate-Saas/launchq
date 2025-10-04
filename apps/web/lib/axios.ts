import axios, { AxiosResponse, AxiosError } from "axios";
import { IResponse, ResponseStateEnum, ISuccessResponse } from "@launchq/core";
import { toast } from "sonner";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse<IResponse>) => {
    // Handle success responses globally
    if (response.data.state === ResponseStateEnum.SUCCESS) {
      const successData = response.data as ISuccessResponse;

      // Show success toast for auth endpoints
      if (
        response.config.url?.includes("/auth/") &&
        !response.config.url?.includes("/auth/user")
      ) {
        toast.success(successData.message, {
          description: response.config.url?.includes("sign-in")
            ? "Welcome back! Redirecting to dashboard..."
            : response.config.url?.includes("sign-up")
              ? "Welcome to LaunchQ! Redirecting to dashboard..."
              : undefined,
        });
      }
    }

    return response;
  },
  (error: AxiosError<IResponse>) => {
    // Handle errors globally
    if (error.response?.data?.message) {
      toast.error("Request failed", {
        description: error.response.data.message,
      });
    } else if (error.message) {
      toast.error("Request failed", {
        description: error.message,
      });
    }

    // Handle token refresh if needed
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      // Redirect to login or handle auth error
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  },
);

export default api;
