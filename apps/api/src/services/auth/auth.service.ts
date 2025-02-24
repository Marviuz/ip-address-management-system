import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/services/users/users.service';
import { OAuthUserSchema } from 'src/types/oauth-user';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateTokens(userId: string) {
    const payload = { sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async login(userId: string) {
    const tokens = await this.generateTokens(userId);
    return tokens;
  }

  async validateGoogleUser(oauthUser: OAuthUserSchema) {
    const user = await this.userService.findOneByProviderId(
      oauthUser.providerId,
    );

    if (!user) {
      const insertedUser = await this.userService.createFromGoogle(oauthUser);

      if (!insertedUser?.account?.providerAccountId)
        throw new Error('Failed to create User');

      return this.userService.findOneByProviderId(
        insertedUser.account.providerAccountId,
      );
    }

    return user;
  }
}
