import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { type Request } from 'express';
import { env } from 'src/env';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private userService: AuthService) {
    super({
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    req: Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails, provider, username } = profile;
    const proxy = req.headers['x-forwarded-for'];
    const proxyIp = typeof proxy === 'object' ? proxy.at(0) : proxy;
    const ipAddress = proxyIp ?? req.ip;
    const userAgent = req.headers['user-agent'];

    const email = emails?.at(0)?.value;
    if (!email) throw new Error('Email not found in Google profile');

    const user = await this.userService.validateGoogleUser(
      {
        username,
        familyName: name?.familyName,
        givenName: name?.givenName,
        middleName: name?.middleName,
        email,
        provider,
        providerId: id,
      },
      ipAddress ?? null,
      userAgent ?? null,
    );

    done(null, user);
  }
}
