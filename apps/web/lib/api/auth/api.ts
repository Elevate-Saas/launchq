import api from "../../axios";
import { IResponse, ILogin, ISignUp, IChangePassword } from "@launchq/core";
import { apiRoutes } from "../apiRoutes";

export const authApi = {
  signIn: (data: ILogin) => api.post<IResponse>(apiRoutes.auth.signIn, data),

  signUp: (data: ISignUp) => api.post<IResponse>(apiRoutes.auth.signUp, data),

  refreshToken: (refreshToken: string) =>
    api.post<IResponse>(apiRoutes.auth.refreshToken, { refreshToken }),

  signOut: () => api.post<IResponse>(apiRoutes.auth.signOut),

  changePassword: (data: IChangePassword) =>
    api.post<IResponse>(apiRoutes.auth.changePassword, data),

  getAuthUser: () => api.get<IResponse>(apiRoutes.auth.getAuthUser),
};
