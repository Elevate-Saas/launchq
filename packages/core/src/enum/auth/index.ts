export enum TokenTypeEnum {
  ACCESS = "access",
  REFRESH = "refresh",
}

export enum UserRoleEnum {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  SUPPORT_STAFF = "support_staff",
  DEVELOPER = "developer",
}

export type IAddMember1 = {
  email: string;
  role: string;
};
