import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma';
import { ICreateOrganization } from '@launchq/core';
import { ResponseUtilsService } from '../shared/utils';
import { Messages } from 'src/shared';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly data: PrismaService,
    private readonly response: ResponseUtilsService,
  ) {}

  async create(id: string, payload: ICreateOrganization) {
    const { businessName, businessEmail, businessLogo } = payload;

    const existingOrg = await this.data.organization.findUnique({
      where: { businessEmail },
    });

    if (existingOrg) {
      return this.response.error400Response(Messages.ORGANIZATION_EXISTS);
    }
    const org = await this.data.organization.create({
      data: {
        businessName,
        businessEmail,
        businessLogo,
        members: { connect: { id } },
      },
    });

    return this.response.success201Response({
      message: 'Organization created successfully',
      data: org,
    });
  }

  async getOrganizations(userId: string) {
    const organizations = await this.data.organization.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        members: { select: { id: true, email: true, name: true, role: true } },
      },
    });
    return this.response.success200Response({
      message: 'Organizations fetched successfully',
      data: organizations,
    });
  }
}
