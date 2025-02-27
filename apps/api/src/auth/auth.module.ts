import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { env } from 'src/env';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessGuard } from './guards/access/access.guard';
import { AccessStrategy } from './strategies/access.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: env.AUTH_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    DrizzleModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    AccessStrategy,
    RefreshStrategy,
    GoogleStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class AuthModule {}
