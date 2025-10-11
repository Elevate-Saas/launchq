export type ICreateWaitlist = {
  name: string;
  description: string;
  emailVerification: boolean;
  enableReferrals: boolean;
  spotBoosts?: number;
  incentiveType?: string;
  incentiveValue?: string;
  organizationId: string;
  emailDashboardLink: boolean;
  emailNotifications: boolean;
};

export type IUpdateWaitlist = {
  id: string;
  name?: string;
  description?: string;
  emailVerification?: boolean;
};

export type IGetWaitlist = {
  organizationId: string;
};
