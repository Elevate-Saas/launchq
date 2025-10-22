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

  // optional additional fields
  isActive?: boolean;
  emailNotifications?: boolean;
  emailDashboardLink?: boolean;

  // referral system fields (optional)
  spotBoosts?: number;
  incentiveType?: string;
  incentiveValue?: string;
};

export type IGetWaitlist = {
  organizationId: string;
};

export type ICreateWaitlistWidget = {
  waitlistId: string;
  submitButtonColor?: string;
  backgroundColor?: string;
  fontColor?: string;
  buttonFontColor?: string;
  makeTransparent?: boolean;
  colorFormat?: string;
  title?: string;
  successTitle?: string;
  successDescription?: string;
  buttonText?: string;
};
