import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { InsertUserSchema } from 'src/types/oauth-user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(userPublicId: string) {
    const payload = { sub: userPublicId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async login(userPublicId: string) {
    const { accessToken, refreshToken } =
      await this.generateTokens(userPublicId);

    const hashedRefreshToken = await hash(refreshToken);

    const updatedUser = await this.userService.updateUser({
      refreshToken: hashedRefreshToken,
      publicId: userPublicId,
    });

    if (!updatedUser)
      throw new Error('Failed to update User with refreshToken');

    return { ...updatedUser, accessToken, refreshToken };
  }

  async logout(userPublicId: string) {
    return this.userService.updateUser({
      publicId: userPublicId,
      refreshToken: null,
    });
  }

  async validateGoogleUser(oauthUser: InsertUserSchema) {
    const user = await this.userService.findOneOrCreate(oauthUser);

    if (!user) throw new Error('Failed to find or create User');

    return user;
  }
}
