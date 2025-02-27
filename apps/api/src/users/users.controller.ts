import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getAuthedUser(@Req() req: Request) {
    return req.user;
  }
}
