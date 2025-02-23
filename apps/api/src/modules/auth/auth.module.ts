import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { GoogleOauthController } from 'src/controllers/auth/google/google-oauth.controller';
import { env } from 'src/env';
import { AuthService } from '../../services/auth/auth.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env.AUTH_SECRET, // TODO: get jwt secret from env
      signOptions: { expiresIn: '60s' },
    }),
    DrizzleModule,
  ],
  controllers: [GoogleOauthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
