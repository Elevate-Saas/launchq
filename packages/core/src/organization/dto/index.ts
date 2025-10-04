import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsEmail()
  @IsNotEmpty()
  businessEmail: string;

  @IsString()
  businessLogo?: string;
}

export class AddMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

export class ResendInviteDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class AcceptInviteDto {
  @IsString()
  @IsNotEmpty()
  orgId: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}

export class AcceptInviteBodyDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
