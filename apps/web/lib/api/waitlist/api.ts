import api from "../../axios";
import { IResponse } from "@launchq/core";

// Waitlist types (since not available in core yet)
export type ICreateWaitlist = {
  name: string;
  description?: string;
  organizationId: string;
};

export type IUpdateWaitlist = {
  name?: string;
  description?: string;
};

export type IWaitlistMember = {
  email: string;
  name?: string;
  metadata?: Record<string, unknown>;
};

export const waitlistApi = {
  getWaitlists: () => api.get<IResponse>("/waitlists"),

  getWaitlist: (id: string) => api.get<IResponse>(`/waitlists/${id}`),

  createWaitlist: (data: ICreateWaitlist) =>
    api.post<IResponse>("/waitlists", data),

  updateWaitlist: (id: string, data: IUpdateWaitlist) =>
    api.patch<IResponse>(`/waitlists/${id}`, data),

  deleteWaitlist: (id: string) => api.delete<IResponse>(`/waitlists/${id}`),

  getWaitlistAnalytics: (id: string) =>
    api.get<IResponse>(`/waitlists/${id}/analytics`),

  getWaitlistData: (id: string) => api.get<IResponse>(`/waitlists/${id}/data`),

  addWaitlistMember: (waitlistId: string, data: IWaitlistMember) =>
    api.post<IResponse>(`/waitlists/${waitlistId}/members`, data),

  getWaitlistMembers: (waitlistId: string) =>
    api.get<IResponse>(`/waitlists/${waitlistId}/members`),
};
