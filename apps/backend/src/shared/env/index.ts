import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export const JWT_SECRET_KEY = configService.get('JWT_SECRET_KEY');
export const JWT_REFRESH_SECRET_KEY = configService.get(
  'JWT_REFRESH_SECRET_KEY',
);
export const PORT = configService.get('PORT');
export const VERSION = configService.get('VERSION');
export const GMAIL = configService.get('GMAIL');
export const GOOGLE_CLIENT_ID = configService.get('GOOGLE_CLIENT_ID');
export const GOOGLE_CLIENT_SECRET = configService.get('GOOGLE_CLIENT_SECRET');
export const GOOGLE_REFRESH_TOKEN = configService.get('GOOGLE_REFRESH_TOKEN');
export const FRONTEND_URL = configService.get('FRONTEND_URL');
