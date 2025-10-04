import { UserRoleEnum } from '@launchq/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnAuthorizedException } from 'src/shared';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRoleEnum[]>(
      'role',
      context.getHandler(),
    );
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new UnAuthorizedException('User role is missing');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new UnAuthorizedException(
        'You do not have permission to access this resource',
      );
    }

    return true;
  }
}
