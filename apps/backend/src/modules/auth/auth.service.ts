import { Injectable } from '@nestjs/common';
import { Messages, TokenTypeEnum } from 'src/shared';
import { PrismaService } from 'src/modules/shared/database/prisma';
import {
  EncryptionUtilsService,
  JwtUtilsService,
  ResponseUtilsService,
  TimeUtilsService,
} from '../shared/utils';
import {
  IChangePassword,
  ILogin,
  IRefreshTokens,
  ISignUp,
} from '@launchq/core';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtUtilsService,
    private readonly data: PrismaService,
    private readonly response: ResponseUtilsService,
    private readonly time: TimeUtilsService,
    private readonly encryption: EncryptionUtilsService,
  ) {}

  async signUp(payload: ISignUp) {
    const { email, password } = payload;

    const existingUser = await this.data.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return this.response.error400Response('A user with this email exists');
    }
    const passwordHash = await this.encryption.hash(password);

    const { id } = await this.data.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    const jwtPayload = { id, email };

    const oneDay = this.time.convertToMilliseconds('days', 1);
    const sevenDays = this.time.convertToMilliseconds('days', 7);

    const token = await this.jwt.sign(jwtPayload, oneDay);
    const refreshToken = await this.jwt.sign(
      jwtPayload,
      sevenDays,
      TokenTypeEnum.REFRESH,
    );
    await this.updateRefreshToken({ refreshToken, userId: id });

    return this.response.success201Response({
      message: 'User created successfully',
      token,
      refreshToken,
      data: {
        id,
      },
    });
  }

  async login(payload: ILogin) {
    const { email, password } = payload;
    const user = await this.data.user.findUnique({
      where: { email },
    });

    if (!user) {
      return this.response.error400Response('Email not registered.');
    }

    const correctPassword: boolean = await this.encryption.compareHash(
      password,
      user.passwordHash,
    );

    if (!correctPassword) {
      return this.response.error400Response(
        `You entered an incorrect login Password, please try again or click on "Forgot Password"`,
      );
    }
    const { id } = user;

    const jwtPayload = {
      id,
      email,
    };

    const oneDay = this.time.convertToMilliseconds('days', 1);
    const sevenDays = this.time.convertToMilliseconds('days', 7);

    const token = await this.jwt.sign(jwtPayload, oneDay);
    const refreshToken = await this.jwt.sign(
      jwtPayload,
      sevenDays,
      TokenTypeEnum.REFRESH,
    );

    await this.updateRefreshToken({ refreshToken, userId: id });

    return this.response.success200Response({
      message: 'Logged in successfully',
      token,
      refreshToken,
      data: {},
    });
  }

  async updateRefreshToken(payload: { refreshToken: string; userId: string }) {
    const { refreshToken, userId: id } = payload;
    const refreshTokenHash = await this.encryption.hash(refreshToken);

    await this.data.user.update({
      where: {
        id,
      },
      data: {
        refreshTokenHash,
      },
    });
  }

  async changePassword(id: string, payload: IChangePassword) {
    const { newPassword, currentPassword } = payload;

    const user = await this.data.user.findUnique({
      where: { id },
    });

    if (!user) {
      return this.response.error400Response('User not found.');
    }

    const correctPassword: boolean = await this.encryption.compareHash(
      currentPassword,
      user.passwordHash,
    );

    if (!correctPassword) {
      return this.response.error400Response('Old password is incorrect.');
    }

    const newPasswordHash = await this.encryption.hash(newPassword);

    await this.data.user.update({
      where: { id },
      data: { passwordHash: newPasswordHash },
    });

    return this.response.success200Response({
      message: 'Password changed successfully.',
      data: {},
    });
  }

  async refreshTokens(payload: IRefreshTokens) {
    const {
      refreshToken: existingRefreshToken,
      refreshTokenHash,
      userId: id,
      email,
    } = payload;

    const correctToken = await this.encryption.compareHash(
      existingRefreshToken,
      refreshTokenHash,
    );

    if (!correctToken) {
      return this.response.error400Response(Messages.INVALID_TOKEN);
    }

    const jwtPayload = {
      id,
      email,
    };

    const oneHr = this.time.convertToMilliseconds('hours', 1);
    const sevenDays = this.time.convertToMilliseconds('days', 7);

    const token = await this.jwt.sign(jwtPayload, oneHr);
    const refreshToken = await this.jwt.sign(
      jwtPayload,
      sevenDays,
      TokenTypeEnum.REFRESH,
    );

    await this.updateRefreshToken({ refreshToken, userId: id });

    return this.response.success200Response({
      message: 'Tokens refreshed successfully',
      data: {
        token,
        refreshToken,
      },
    });
  }

  async getAuthUser(payload: User) {
    const { id, email, name, role } = payload;

    return this.response.success200Response({
      message: 'User retrieved successfully',
      data: {
        id,
        email,
        name,
        role,
      },
    });
  }
}
