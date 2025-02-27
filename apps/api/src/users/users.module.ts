import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { AccessStrategy } from 'src/auth/strategies/access.strategy';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DrizzleModule],
  controllers: [UsersController],
  providers: [JwtService, AuthService, UsersService, AccessStrategy],
})
export class UsersModule {}
