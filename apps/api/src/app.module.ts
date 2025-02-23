import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GoogleOauthController } from './google-oauth/google-oauth.controller';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';

@Module({
  imports: [AuthModule, UsersModule, GoogleOauthModule],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService],
})
export class AppModule {}
