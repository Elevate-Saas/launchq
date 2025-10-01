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
