import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';

@Module({
  imports: [],
  providers: [GmailService],
  exports: [GmailService],
})
export class GmailServiceModule {}
