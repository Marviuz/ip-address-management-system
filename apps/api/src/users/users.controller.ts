import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getAuthedUser(@Req() req: Request) {
    return req.user;
  }

  @Roles('super_admin')
  @Get('me/super-admin')
  superAdmin() {
    return { type: 'super_admin' };
  }

  @Roles('regular')
  @Get('me/regular')
  regular() {
    return { type: 'regular' };
  }
}
