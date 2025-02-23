import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { GoogleStrategy } from 'src/strategies/google.strategy';

@Module({
  imports: [],
  providers: [UsersService, GoogleStrategy],
  exports: [GoogleStrategy],
})
export class GoogleOauthModule {}
