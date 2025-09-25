import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Test!';
  }

  getGoodbye(): string {
    return 'Goodbye!';
  }
}
