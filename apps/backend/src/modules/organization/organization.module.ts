import { Module } from '@nestjs/common';
import { DatabaseServiceModule } from '../shared/database/database.module';
import { UtilsServiceModule } from '../shared/utils/utils.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { EmailServicesModule } from '../shared/utils/email/email.module';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [DatabaseServiceModule, UtilsServiceModule, EmailServicesModule],
})
export class OrganizationModule {}
