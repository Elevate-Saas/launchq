import { Body, Controller, Get, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { WaitlistService } from './waitlist.service';
import {
  CreateWaitlistDto,
  GetWaitlistDto,
  ICreateWaitlist,
  IGetWaitlist,
  IResponse,
  IUpdateWaitlist,
  UpdateWaitlistDto,
  UserRoleEnum,
} from '@launchq/core';
import { Authorization, Roles } from 'src/shared/decorators';
@Controller('waitlist')
export class WaitlistController {
  constructor(private readonly service: WaitlistService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Authorization()
  @Post('/create')
  async createWaitlist(@Body() body: CreateWaitlistDto, @Res() res: Response) {
    const payload: ICreateWaitlist = body;
    const response: IResponse = await this.service.createWaitlist(payload);
    return res.status(response.status).json(response);
  }

  @Authorization()
  @Get('/')
  async getWaitlists(@Query() query: GetWaitlistDto, @Res() res: Response) {
    const payload: IGetWaitlist = query; // IGetWaitlist
    const response: IResponse = await this.service.getWaitlists(payload);
    return res.status(response.status).json(response);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Authorization()
  @Patch('/update')
  async updateWaitlist(@Body() body: UpdateWaitlistDto, @Res() res: Response) {
    const payload: IUpdateWaitlist = body;
    const response: IResponse = await this.service.updateWaitlist(payload);
    return res.status(response.status).json(response);
  }
}
