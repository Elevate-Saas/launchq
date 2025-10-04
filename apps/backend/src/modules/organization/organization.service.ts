import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/database/prisma';
import {
  IAcceptInvite,
  IAddMember,
  ICreateOrganization,
  IResendInvite,
} from '@launchq/core';
import { EncryptionUtilsService, ResponseUtilsService } from '../shared/utils';
import { FRONTEND_URL, Messages } from 'src/shared';
import { IEmailService } from '../shared/utils/email/abstract';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly data: PrismaService,
    private readonly response: ResponseUtilsService,
    private readonly encryption: EncryptionUtilsService,
    @Inject('Gmail') private readonly email: IEmailService,
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

  async addMember(id: string, payload: IAddMember) {
    const { email, role } = payload;
    const org = await this.data.organization.findFirst({
      where: {
        members: {
          some: {
            id,
          },
        },
      },
      select: { id: true, businessName: true },
    });

    if (!org) {
      return this.response.error400Response(Messages.ORGANIZATION_NOT_FOUND);
    }

    const [existingMember, existingInvite] = await this.data.$transaction([
      this.data.user.findFirst({
        where: {
          email,
          organizationId: org.id,
        },
        select: { id: true },
      }),
      this.data.invitation.findFirst({
        where: { email, organizationId: org.id },
        select: { id: true },
      }),
    ]);
    // const members = org.members.map((member) => member.email);
    // console.log({ members });
    // if (email in members) {
    //   return this.response.error403Response(Messages.EMAIL_ALREADY_EXISTS);
    // }
    // const existingInvite = await this.data.invitation.findFirst({
    //   where: { email },
    // });
    // if (existingInvite) {
    //   return this.response.error400Response(Messages.EMAIL_ALREADY_EXISTS);
    // }

    if (existingMember || existingInvite) {
      return this.response.error403Response(Messages.EMAIL_ALREADY_EXISTS);
    }
    const invite = await this.data.invitation.create({
      data: {
        email,
        role,
        inviterId: id,
        organizationId: org.id,
        token: Math.random().toString(16).substring(2, 20),
      },
    });
    // send email to user with invite link
    const inviteLink = `${FRONTEND_URL}/invite?orgId=${org.id}&token=${invite.token}`;
    await this.email.send({
      toEmail: email,
      subject: 'You have been invited to join an organization',
      html: `<p>You have been invited to join the organization ${org.businessName} as a ${role}. Click the link below to accept the invitation:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>If you did not expect this invitation, you can ignore this email.</p>`,
    });

    return this.response.success200Response({
      message: 'Member invited successfully',
      data: inviteLink,
    });
  }

  async resendInvite(id: string, payload: IResendInvite) {
    const { email } = payload;
    const org = await this.data.organization.findFirst({
      where: {
        members: {
          some: {
            id,
          },
        },
      },
    });

    if (!org) {
      return this.response.error400Response(Messages.ORGANIZATION_NOT_FOUND);
    }
    const invite = await this.data.invitation.findFirst({
      where: {
        email,
        organizationId: org.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!invite) {
      return this.response.error400Response(Messages.INVITATION_NOT_FOUND);
    }

    // resend email to user with invite link
    const inviteLink = `${FRONTEND_URL}/invite?orgId=${org.id}&token=${invite.token}`;
    await this.email.send({
      toEmail: email,
      subject: 'Reminder: Invitation to join an organization',
      html: `<p>This is a reminder that you have been invited to join the organization ${org.businessName} as a ${invite.role}. Click the link below to accept the invitation:</p>
      <a href="${inviteLink}">${inviteLink}</a>
      <p>If you did not expect this invitation, you can ignore this email.</p>`,
    });

    return this.response.success200Response({
      message: Messages.INVITATION_RESENT,
      data: inviteLink,
    });
  }

  async acceptInvite(payload: IAcceptInvite) {
    const { orgId, token, password } = payload;
    const invite = await this.data.invitation.findFirst({
      where: { organizationId: orgId, token },
    });

    if (!invite) {
      return this.response.error404Response(Messages.INVITATION_NOT_FOUND);
    }

    if (invite.accepted) {
      return this.response.error400Response(
        Messages.INVITATION_ALREADY_ACCEPTED,
      );
    }

    const passwordHash = await this.encryption.hash(password);

    const user = await this.data.user.create({
      data: {
        email: invite.email,
        passwordHash,
        role: invite.role,
        organization: { connect: { id: orgId } },
      },
    });

    await this.data.invitation.update({
      where: { id: invite.id },
      data: {
        accepted: true,
        acceptedAt: new Date(),
      },
    });

    return this.response.success201Response({
      message: Messages.INVITATION_ACCEPTED,
      data: { userId: user.id },
    });
  }

  async getInvitations(id: string) {
    const invitations = await this.data.invitation.findMany({
      where: { inviterId: id },
    });
    return this.response.success200Response({
      message: Messages.INVITATIONS_FETCHED,
      data: invitations,
    });
  }
}
