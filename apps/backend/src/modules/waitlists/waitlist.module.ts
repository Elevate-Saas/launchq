import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { DatabaseServiceModule } from '../shared/database/database.module';
import { UtilsServiceModule } from '../shared/utils/utils.module';

@Module({
  imports: [DatabaseServiceModule, UtilsServiceModule],
  controllers: [WaitlistController],
  providers: [WaitlistService],
})
export class WaitlistModule {}
