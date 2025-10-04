import { GenericEmailModule } from './generic/generic.module';
import { GenericEmailService } from './generic/generic.service';
import { GmailServiceModule } from './gmail/gmail.module';
import { Module } from '@nestjs/common';
import { GmailService } from './gmail/gmail.service';

@Module({
  imports: [GenericEmailModule, GmailServiceModule],
  providers: [
    {
      provide: 'Generic',
      useExisting: GenericEmailService,
    },
    {
      provide: 'Gmail',
      useExisting: GmailService,
    },
  ],
  exports: ['Gmail', 'Generic'],
})
export class EmailServicesModule {}
