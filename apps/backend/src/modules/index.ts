import { AuthModule } from './auth/auth.module';
// import shared from './shared';
import { DatabaseServiceModule } from './shared/database/database.module';
import { UtilsServiceModule } from './shared/utils/utils.module';

// export default [AuthModule, ...shared];
export default [AuthModule, DatabaseServiceModule, UtilsServiceModule];
