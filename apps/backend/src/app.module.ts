import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as morgan from 'morgan';

// import modules from './modules';
import { AuthenticationGuard, RolesGuard } from './shared';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseServiceModule } from './modules/shared/database/database.module';
import { UtilsServiceModule } from './modules/shared/utils/utils.module';
import { OrganizationModule } from './modules/organization/organization.module';
@Module({
  imports: [
    AuthModule,
    DatabaseServiceModule,
    UtilsServiceModule,
    OrganizationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('dev')).forRoutes('*');
  }
}
