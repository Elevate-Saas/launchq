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
