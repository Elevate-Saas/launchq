import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../modules/shared/database/prisma';
// import { JwtUtilsService } from '../../modules/shared/utils';
import { Messages, UnAuthorizedException } from 'src/shared';
import { TokenTypeEnum } from '@launchq/core';
import { JwtUtilsService } from 'src/modules/shared/utils/jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly data: PrismaService,
    private readonly reflector: Reflector,
    private readonly jwt: JwtUtilsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: any = context.switchToHttp().getRequest();

      const decorator = this.reflector.get(
        'authorization',
        context.getHandler(),
      );

      if (!decorator) return true;

      let token = request.headers.authorization;

      if (!token) throw new UnAuthorizedException(Messages.SESSION_EXPIRED);
      token = token.replace('Bearer ', '');

      const tokenType = decorator ? TokenTypeEnum.ACCESS : null;
      const decoded: any = await this.jwt.verify(token, tokenType);
      const notDecodedMessage = decorator
        ? 'Session has expired, please login'
        : 'Session has expired, please restart reset process';

      if (!decoded) {
        console.log('--- decoded failed --');
        throw new UnAuthorizedException(notDecodedMessage);
      }

      const user = await this.data.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) throw new UnAuthorizedException(Messages.SESSION_EXPIRED);

      request.user = user;

      return true;
    } catch (error) {
      console.log('====== error ======');
      console.log(error);
      console.log('====== error ======');

      throw new UnAuthorizedException(Messages.SESSION_EXPIRED);
    }
  }
}
