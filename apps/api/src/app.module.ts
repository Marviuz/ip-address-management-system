import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleOauthController } from './controllers/auth/google/google-oauth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleOauthModule } from './modules/google-oauth/google-oauth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AuthModule, GoogleOauthModule, UsersModule],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService],
})
export class AppModule {}
