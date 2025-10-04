import api from "../../axios";
import {
  IResponse,
  ICreateOrganization,
  IAddMember,
  IResendInvite,
  IAcceptInvite,
} from "@launchq/core";
import { apiRoutes } from "../apiRoutes";

export const organizationApi = {
  getOrganization: () =>
    api.get<IResponse>(apiRoutes.organization.getOrganization),

  createOrganization: (data: ICreateOrganization) =>
    api.post<IResponse>(apiRoutes.organization.createOrganization, data),

  updateOrganization: (id: string, data: Partial<ICreateOrganization>) =>
    api.patch<IResponse>(`/organizations/${id}`, data),

  deleteOrganization: (id: string) =>
    api.delete<IResponse>(`/organizations/${id}`),

  addMember: (data: IAddMember) =>
    api.post<IResponse>("/organizations/members", data),

  resendInvite: (data: IResendInvite) =>
    api.post<IResponse>("/organizations/resend-invite", data),

  acceptInvite: (data: IAcceptInvite) =>
    api.post<IResponse>("/organizations/accept-invite", data),
};
