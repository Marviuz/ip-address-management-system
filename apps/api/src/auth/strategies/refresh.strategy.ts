import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SESSION_COOKIE } from '@ip-address-management-system/shared';
import { env } from 'src/env';
import { type TokenPayload } from 'src/types/user';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = this.getRefreshToken(req.cookies);
          return token;
        },
      ]),
      secretOrKey: env.AUTH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const userPublicId = payload.sub;

    const token = this.getRefreshToken(req.cookies);

    const user = await this.authService.validateRefreshToken(
      userPublicId,
      token,
    );

    return user;
  }

  getRefreshToken(cookies: Record<string, unknown>) {
    const token = cookies[SESSION_COOKIE];
    if (typeof token !== 'string')
      throw new UnauthorizedException('Refresh token not found!');
    return token;
  }
}
