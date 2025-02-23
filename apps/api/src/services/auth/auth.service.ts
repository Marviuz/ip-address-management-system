import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { OAuthUserSchema } from 'src/types/oauth-user';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

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
