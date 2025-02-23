import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      callbackURL: 'http://localhost:8000/auth/google/redirect',
      clientID:
        '64883070672-nm5v11itn7e8ri6a3e24i70jhvv8j9ab.apps.googleusercontent.com',
      clientSecret: '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',
      scope: ['email', 'profile'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const user = this.authService.signIn(profile);

    done(null, user);
  }
}
