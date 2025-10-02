import { UserRoleEnum } from '@launchq/core';
import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';

export const Authorization = () => SetMetadata('authorization', true);
export const Refresh = () => SetMetadata('refresh-authorization', true);
export const EmailVerified = () => SetMetadata('email-verified', true);
export const Roles = (...roles: UserRoleEnum[]) => SetMetadata('roles', roles);
export const GetUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { user } = request;

    // return request.user;
    if (!user) {
      throw new UnauthorizedException(
        'Your session is invalid. Please log in again.',
      );
    }

    return user;
  },
);
