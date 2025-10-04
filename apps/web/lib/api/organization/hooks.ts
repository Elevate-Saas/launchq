import { useMutation, useQuery } from "@tanstack/react-query";
import { organizationApi } from "./api";
import {
  ICreateOrganization,
  IAddMember,
  IResendInvite,
  IAcceptInvite,
  ISuccessResponse,
  ResponseStateEnum,
} from "@launchq/core";
import { toast } from "sonner";

export const useGetOrganization = () => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: () => organizationApi.getOrganization(),
  });
};

export const useCreateOrganization = () => {
  return useMutation({
    mutationFn: (data: ICreateOrganization) =>
      organizationApi.createOrganization(data),
    onSuccess: (response) => {
      if (response.data.state === ResponseStateEnum.SUCCESS) {
        const successData = response.data as ISuccessResponse;
        toast.success(successData.message);
      }
    },
  });
};

export const useUpdateOrganization = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ICreateOrganization>;
    }) => organizationApi.updateOrganization(id, data),
  });
};

export const useDeleteOrganization = () => {
  return useMutation({
    mutationFn: (id: string) => organizationApi.deleteOrganization(id),
  });
};

export const useAddMember = () => {
  return useMutation({
    mutationFn: (data: IAddMember) => organizationApi.addMember(data),
  });
};

export const useResendInvite = () => {
  return useMutation({
    mutationFn: (data: IResendInvite) => organizationApi.resendInvite(data),
  });
};

export const useAcceptInvite = () => {
  return useMutation({
    mutationFn: (data: IAcceptInvite) => organizationApi.acceptInvite(data),
  });
};
