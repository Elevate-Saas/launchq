import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "./api";
import {
  ILogin,
  ISignUp,
  ResponseStateEnum,
  ISuccessResponse,
} from "@launchq/core";
import { useUserStore } from "@/lib/stores/user-store";
import Cookies from "js-cookie";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (data: ILogin) => authApi.signIn(data),
    onSuccess: (response) => {
      if (response.data.state === ResponseStateEnum.SUCCESS) {
        const successData = response.data as ISuccessResponse;
        console.log("successData.token", successData.token);
        if (successData.token) {
          Cookies.set("accessToken", successData.token);
        }
        if (successData.refreshToken) {
          Cookies.set("refreshToken", successData.refreshToken);
        }
      }
    },
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: ISignUp) => authApi.signUp(data),
    onSuccess: (response) => {
      if (response.data.state === ResponseStateEnum.SUCCESS) {
        const successData = response.data as ISuccessResponse;
        if (successData.token) {
          Cookies.set("accessToken", successData.token);
        }
        if (successData.refreshToken) {
          Cookies.set("refreshToken", successData.refreshToken);
        }
      }
    },
  });
};

export const useSignOut = () => {
  const clearUser = useUserStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => authApi.signOut(),
    onSuccess: () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      clearUser();
    },
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: (refreshToken: string) => authApi.refreshToken(refreshToken),
    onSuccess: (response) => {
      if (response.data.state === ResponseStateEnum.SUCCESS) {
        const successData = response.data as ISuccessResponse;
        if (successData.token) {
          Cookies.set("accessToken", successData.token, { expires: 1 });
        }
        if (successData.refreshToken) {
          Cookies.set("refreshToken", successData.refreshToken, {
            expires: 30,
          });
        }
      }
    },
  });
};

export const useGetAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authApi.getAuthUser(),
  });
};
