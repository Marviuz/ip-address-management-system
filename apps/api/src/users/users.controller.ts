import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getAuthedUser(@Req() req: Request) {
    const user = await this.usersService.findAuthedUser(req.user.publicId);
    if (!user) throw new UnauthorizedException('User not found!');
    return user;
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
