import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleOauthController } from './controllers/auth/google/google-oauth.controller';
import { GoogleOauthModule } from './modules/google-oauth/google-oauth.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DrizzleModule } from './modules/drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule, AuthModule, GoogleOauthModule, UsersModule],
  controllers: [AppController, GoogleOauthController],
  providers: [AppService],
})
export class AppModule {}
