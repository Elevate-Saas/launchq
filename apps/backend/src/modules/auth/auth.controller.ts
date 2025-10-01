import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignUpDto } from './dto';
import { AuthService } from './auth.service';
import { IResponse, ISignUp } from '@launchq/core';
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
}
