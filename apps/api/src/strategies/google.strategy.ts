import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { env } from 'src/env';
import { AuthService } from 'src/services/auth/auth.service';
import { OAuthUserSchema } from 'src/types/oauth-user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: AuthService) {
    super({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, provider, username } = profile;

    const user = {
      username,
      familyName: name?.familyName,
      givenName: name?.givenName,
      middleName: name?.middleName,
      email: emails?.at(0)?.value,
      provider,
      providerId: id,
    } satisfies Partial<OAuthUserSchema>;

    done(null, user);

    return user;
  }
}
