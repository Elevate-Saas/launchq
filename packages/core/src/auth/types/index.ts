import { ChangePasswordDto, LoginDto, SignUpDto } from "../dto";

export type ISignUp = SignUpDto;
export type ILogin = LoginDto;
export type IChangePassword = ChangePasswordDto;
export type IRefreshTokens = {
  email: string;
  userId: string;
  refreshToken: string;
  refreshTokenHash: string;
};
