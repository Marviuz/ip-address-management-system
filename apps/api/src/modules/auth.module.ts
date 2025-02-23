import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users.module';
import { GoogleOauthController } from 'src/controllers/auth/google/google-oauth.controller';
import { env } from 'src/env';
import { AuthService } from 'src/services/auth.service';
import { DrizzleModule } from './drizzle/drizzle.module';
import { GoogleOauthModule } from './google-oauth/google-oauth.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env.AUTH_SECRET, // TODO: get jwt secret from env
      signOptions: { expiresIn: '60s' },
    }),
    DrizzleModule,
    GoogleOauthModule,
  ],
  controllers: [GoogleOauthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
