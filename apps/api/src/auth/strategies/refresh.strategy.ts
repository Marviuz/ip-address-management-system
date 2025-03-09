import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TOKEN_LABELS } from '@ip-address-management-system/shared';
import { env } from 'src/env';
import { type TokenPayload } from 'src/types/user';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const token = String(req.cookies[TOKEN_LABELS.REFRESH_TOKEN]);
          if (!token)
            throw new UnauthorizedException('Refresh token not found!');
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

    // const refreshToken = this.authService.extractBearerTokenFromAuthHeader(
    //   String(req.cookies[TOKEN_LABELS.REFRESH_TOKEN]),
    // );
    const user = await this.authService.validateRefreshToken(
      userPublicId,
      // refreshToken,
      String(req.cookies[TOKEN_LABELS.REFRESH_TOKEN]),
    );

    return user;
  }
}
