import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from 'src/auth/auth.service';
import { AccessStrategy } from 'src/auth/strategies/access.strategy';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { AccessGuard } from 'src/auth/guards/access/access.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [
    JwtService,
    AuthService,
    UsersService,
    AccessStrategy,
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
  ],
})
export class UsersModule {}
