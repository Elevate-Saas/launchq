import { HttpStatus } from "@nestjs/common";
import { ResponseStateEnum } from "../../enum";

export type ISuccessResponse = {
  message: string;
  token?: string;
  refreshToken?: string;
  data?: Record<string, any> | string | number;
  status?: HttpStatus;
  state?: ResponseStateEnum;
  pagination?: {
    hasPrevious: boolean;
    prevPage: number;
    hasNext: boolean;
    next: number;
    currentPage: number;
    pageSize: number;
    lastPage: number;
    total: any;
  };
};

export type IErrorResponse = {
  status?: HttpStatus;
  message: string;
  error?: null;
  state?: ResponseStateEnum;
};
export type IResponse = ISuccessResponse | IErrorResponse;
