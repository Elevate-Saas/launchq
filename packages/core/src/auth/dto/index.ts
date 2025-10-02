import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "Password must contain at least one uppercase letter, one lowercase letter, a number and a special character",
  })
  password: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  @IsString()
  public readonly password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  public readonly currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      "New password must contain at least one uppercase letter, one lowercase letter, a number and a special character",
  })
  public readonly newPassword: string;
}
