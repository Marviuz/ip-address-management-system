import { Module } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
