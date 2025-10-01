import { Module } from '@nestjs/common';
import { DatabaseServiceModule } from 'src/modules/shared/database/database.module';
import { UtilsServiceModule } from 'src/modules/shared/utils/utils.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UtilsServiceModule, DatabaseServiceModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
