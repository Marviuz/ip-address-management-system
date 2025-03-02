import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type Request } from 'express';
import { env } from 'src/env';
import { type TokenPayload } from 'src/types/user';
import { type AuthService } from '../auth.service';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.AUTH_SECRET,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const userPublicId = payload.sub;

    const refreshToken = this.authService.extractBearerTokenFromAuthHeader(
      req.headers.authorization,
    );
    const user = await this.authService.validateRefreshToken(
      userPublicId,
      refreshToken,
    );

    return user;
  }
}
