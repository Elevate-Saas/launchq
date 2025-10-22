import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import { WaitlistIncentiveTypeEnum } from "../../enum";

export class CreateWaitlistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  emailVerification: boolean;

  @IsBoolean()
  @IsNotEmpty()
  enableReferrals: boolean;

  @IsInt()
  @IsOptional()
  spotBoosts: number;

  @IsString()
  @IsOptional()
  @IsEnum(WaitlistIncentiveTypeEnum)
  incentiveType: string;

  @IsString()
  @IsOptional()
  incentiveValue: string;

  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsBoolean()
  @IsNotEmpty()
  emailDashboardLink: boolean;

  @IsBoolean()
  @IsNotEmpty()
  emailNotifications: boolean;
}

export class UpdateWaitlistDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  emailVerification?: boolean;

  // optional additional fields
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  emailNotifications?: boolean;

  @IsBoolean()
  @IsOptional()
  emailDashboardLink?: boolean;

  // referral system fields (optional)
  @IsInt()
  @IsOptional()
  spotBoosts?: number;

  @IsString()
  @IsOptional()
  @IsEnum(WaitlistIncentiveTypeEnum)
  incentiveType?: string;

  @IsString()
  @IsOptional()
  incentiveValue?: string;
}

export class GetWaitlistDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;
}

export class CreateWaitlistWidgetDto {
  @IsString()
  @IsNotEmpty()
  waitlistId: string;

  @IsString()
  @IsOptional()
  submitButtonColor?: string;

  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @IsString()
  @IsOptional()
  fontColor?: string;

  @IsString()
  @IsOptional()
  buttonFontColor?: string;

  @IsBoolean()
  @IsOptional()
  makeTransparent?: boolean;

  @IsString()
  @IsOptional()
  colorFormat?: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  successTitle?: string;

  @IsString()
  @IsOptional()
  successDescription?: string;

  @IsString()
  @IsOptional()
  buttonText?: string;
}
