import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { env } from 'src/env';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: env.AUTH_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    DrizzleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, GoogleStrategy],
})
export class AuthModule {}
