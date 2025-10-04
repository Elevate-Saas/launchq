import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrganizationService } from './organization.service';
import { Authorization, GetUser, Roles } from 'src/shared';
import {
  AcceptInviteBodyDto,
  AcceptInviteDto,
  AddMemberDto,
  CreateOrganizationDto,
  IAcceptInvite,
  IAddMember,
  ICreateOrganization,
  IResendInvite,
  IResponse,
  ResendInviteDto,
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

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Authorization()
  @Post('/add-member')
  async addMember(
    @GetUser() user: User,
    @Body() body: AddMemberDto,
    @Res() res: Response,
  ) {
    const { id } = user;
    const payload: IAddMember = body;
    const response: IResponse = await this.service.addMember(id, payload);
    return res.status(response.status).json(response);
  }

  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Authorization()
  @Post('/resend-invite')
  async resendInvite(
    @GetUser() user: User,
    @Body() body: ResendInviteDto,
    @Res() res: Response,
  ) {
    const { id } = user;
    const payload: IResendInvite = body;
    const response: IResponse = await this.service.resendInvite(id, payload);
    return res.status(response.status).json(response);
  }

  @Post('/accept-invite')
  async acceptInvite(
    @Query() query: AcceptInviteDto,
    @Body() body: AcceptInviteBodyDto,
    @Res() res: Response,
  ) {
    const payload: IAcceptInvite = {
      orgId: query.orgId,
      token: query.token,
      password: body.password,
    };
    const response: IResponse = await this.service.acceptInvite(payload);
    return res.status(response.status).json(response);
  }

  @Authorization()
  @Get('/invites')
  async getInvites(@GetUser() user: User, @Res() res: Response) {
    const { id } = user;
    const response: IResponse = await this.service.getInvitations(id);
    return res.status(response.status).json(response);
  }
}
