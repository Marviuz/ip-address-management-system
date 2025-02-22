import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    // TODO: Infer types from database
    access_token: string;
  }> {
    const user = await this.userService.findOne(username);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const { password: _, ...result } = user;
    return {
      access_token: await this.jwtService.signAsync({
        sub: result.userId,
        username: result.username,
      }),
    };
  }
}
