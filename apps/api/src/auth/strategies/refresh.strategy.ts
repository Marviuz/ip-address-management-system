import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/env';
import { type TokenPayload } from 'src/types/user';
import { type AuthService } from '../auth.service';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.AUTH_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload) {
    const userPublicId = payload.sub;
    const userId = await this.authService.validateRefreshToken(userPublicId);
    return userId;
  }
}
