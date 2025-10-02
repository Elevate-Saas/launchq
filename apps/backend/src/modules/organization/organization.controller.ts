import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrganizationService } from './organization.service';
import { Authorization, GetUser, Roles } from 'src/shared';
import {
  CreateOrganizationDto,
  ICreateOrganization,
  IResponse,
  UserRoleEnum,
} from '@launchq/core';
import { User } from '@prisma/client';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Authorization()
  @Post('/create')
  async createOrganization(
    @GetUser() user: User,
    @Body() body: CreateOrganizationDto,
    @Res() res: Response,
  ) {
    const { id } = user;
    const payload: ICreateOrganization = body;
    const response: IResponse = await this.service.create(id, payload);
    return res.status(response.status).json(response);
  }

  @Authorization()
  @Get('/')
  async getOrganizations(@GetUser() user: User, @Res() res: Response) {
    const { id } = user;
    const response: IResponse = await this.service.getOrganizations(id);
    return res.status(response.status).json(response);
  }
}
