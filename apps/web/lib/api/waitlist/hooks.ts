import { useMutation, useQuery } from "@tanstack/react-query";
import {
  waitlistApi,
  ICreateWaitlist,
  IUpdateWaitlist,
  IWaitlistMember,
} from "./api";

export const useGetWaitlists = () => {
  return useQuery({
    queryKey: ["waitlists"],
    queryFn: () => waitlistApi.getWaitlists(),
  });
};

export const useGetWaitlist = (id: string) => {
  return useQuery({
    queryKey: ["waitlist", id],
    queryFn: () => waitlistApi.getWaitlist(id),
    enabled: !!id,
  });
};

export const useCreateWaitlist = () => {
  return useMutation({
    mutationFn: (data: ICreateWaitlist) => waitlistApi.createWaitlist(data),
  });
};

export const useUpdateWaitlist = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IUpdateWaitlist }) =>
      waitlistApi.updateWaitlist(id, data),
  });
};

export const useDeleteWaitlist = () => {
  return useMutation({
    mutationFn: (id: string) => waitlistApi.deleteWaitlist(id),
  });
};

export const useGetWaitlistAnalytics = (id: string) => {
  return useQuery({
    queryKey: ["waitlist-analytics", id],
    queryFn: () => waitlistApi.getWaitlistAnalytics(id),
    enabled: !!id,
  });
};

export const useGetWaitlistData = (id: string) => {
  return useQuery({
    queryKey: ["waitlist-data", id],
    queryFn: () => waitlistApi.getWaitlistData(id),
    enabled: !!id,
  });
};

export const useAddWaitlistMember = () => {
  return useMutation({
    mutationFn: ({
      waitlistId,
      data,
    }: {
      waitlistId: string;
      data: IWaitlistMember;
    }) => waitlistApi.addWaitlistMember(waitlistId, data),
  });
};

export const useGetWaitlistMembers = (waitlistId: string) => {
  return useQuery({
    queryKey: ["waitlist-members", waitlistId],
    queryFn: () => waitlistApi.getWaitlistMembers(waitlistId),
    enabled: !!waitlistId,
  });
};
