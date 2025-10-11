import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma';
import { ResponseUtilsService } from '../shared/utils';
import { ICreateWaitlist, IGetWaitlist, IUpdateWaitlist } from '@launchq/core';
import { Messages } from 'src/shared';

@Injectable()
export class WaitlistService {
  constructor(
    private readonly data: PrismaService,
    private readonly response: ResponseUtilsService,
  ) {}

  async createWaitlist(payload: ICreateWaitlist) {
    const {
      name,
      description,
      emailVerification,
      enableReferrals,
      spotBoosts,
      incentiveType,
      incentiveValue,
      organizationId,
      emailDashboardLink,
      emailNotifications,
    } = payload;

    const org = await this.data.organization.findUnique({
      where: { id: organizationId },
    });

    if (!org) {
      return this.response.error400Response(Messages.ORGANIZATION_NOT_FOUND);
    }
    const result = await this.data.$transaction(async (tx) => {
      const waitlist = await tx.waitlist.create({
        data: {
          name,
          description,
          emailVerification,
          organizationId,
          notifications: {
            create: {
              emailNotifications,
              emailDashboardLink,
            },
          },
          ...(enableReferrals && {
            referralSystem: {
              create: {
                spotBoosts,
                incentiveType,
                incentiveValue,
              },
            },
          }),
        },
        include: {
          notifications: true,
          referralSystem: true,
        },
      });

      return waitlist;
    });

    return this.response.success201Response({
      message: Messages.WAITLIST_CREATED,
      data: result,
    });
  }
  async getWaitlists(payload: IGetWaitlist) {
    const { organizationId } = payload;

    const waitlists = await this.data.waitlist.findMany({
      where: {
        organizationId,
      },
      include: {
        notifications: true,
        referralSystem: true,
      },
    });

    return this.response.success200Response({
      message: Messages.WAITLIST_FETCHED,
      data: waitlists,
    });
  }

  async updateWaitlist(payload: IUpdateWaitlist) {
    const { id, name, description, emailVerification } = payload;

    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(emailVerification !== undefined && { emailVerification }),
    };

    if (Object.keys(updateData).length === 0) {
      return this.response.error400Response(Messages.INVALID_UPDATE_FIELDS);
    }

    const waitlist = await this.data.waitlist
      .update({
        where: { id },
        data: updateData,
      })
      .catch(() => null);

    if (!waitlist) {
      return this.response.error400Response(Messages.WAITLIST_NOT_FOUND);
    }

    return this.response.success201Response({
      message: Messages.WAITLIST_UPDATED,
      data: waitlist,
    });
  }
}
