import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DrizzleModule, AuthModule],
  providers: [UsersService, GoogleStrategy],
  exports: [GoogleStrategy],
})
export class GoogleOauthModule {}
