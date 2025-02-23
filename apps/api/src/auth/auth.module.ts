import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { GoogleOauthController } from 'src/google-oauth/google-oauth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: 'secret', // TODO: get jwt secret from env
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [GoogleOauthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
