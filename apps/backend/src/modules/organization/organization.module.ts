import { Module } from '@nestjs/common';
import { DatabaseServiceModule } from '../shared/database/database.module';
import { UtilsServiceModule } from '../shared/utils/utils.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [DatabaseServiceModule, UtilsServiceModule],
})
export class OrganizationModule {}
