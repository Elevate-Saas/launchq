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
}

export class GetWaitlistDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;
}
