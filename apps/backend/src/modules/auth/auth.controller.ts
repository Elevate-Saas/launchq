import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { User } from '@prisma/client';
import { Response } from 'express';
import { SignUpDto } from './dto';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  IChangePassword,
  IResponse,
  ISignUp,
} from '@launchq/core';
import { Authorization, GetUser } from 'src/shared';
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignUpDto, @Res() res: Response) {
    const payload: ISignUp = body;
    const response: IResponse = await this.service.signUp(payload);
    return res.status(response.status).json(response);
  }

  @Post('/login')
  async login(@Body() body: SignUpDto, @Res() res: Response) {
    const payload: ISignUp = body;
    const response: IResponse = await this.service.login(payload);
    return res.status(response.status).json(response);
  }

  @Authorization()
  @Post('/change-password')
  async changePassword(
    @GetUser() user: User,
    @Body() body: ChangePasswordDto,
    @Res() res: Response,
  ) {
    const { id } = user;
    const payload: IChangePassword = body;
    const response: IResponse = await this.service.changePassword(id, payload);
    return res.status(response.status).json(response);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: any, @Res() res: Response) {
    const { refreshToken } = body;
    const response: IResponse = await this.service.refreshTokens(refreshToken);
    return res.status(response.status).json(response);
  }

  @Authorization()
  @Get('/user')
  async getAuthUser(@GetUser() user: User, @Res() res: Response) {
    const response: IResponse = await this.service.getAuthUser(user);
    return res.status(response.status).json(response);
  }
}
