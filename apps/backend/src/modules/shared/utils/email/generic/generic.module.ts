import { Module } from '@nestjs/common';
// import { IEmailService } from 'src/common';
import { GenericEmailService } from './generic.service';

@Module({
  imports: [],
  providers: [GenericEmailService],
  exports: [GenericEmailService],
})
export class GenericEmailModule {}
