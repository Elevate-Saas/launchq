export type ICreateOrganization = {
  businessName: string;
  businessEmail: string;
  businessLogo?: string;
};

export type IAddMember = {
  email: string;
  role: string;
};

export type IResendInvite = {
  email: string;
};

export type IAcceptInvite = {
  orgId: string;
  token: string;
  password: string;
};

export interface OrganizationMember {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: string;
  deletedAt: string | null;
}

export interface Organization {
  id: string;
  businessName: string;
  businessEmail: string;
  businessLogo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  members: OrganizationMember[];
}
