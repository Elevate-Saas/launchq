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
