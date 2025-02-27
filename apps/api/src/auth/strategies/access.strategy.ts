import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'src/env';
import { type TokenPayload } from 'src/types/user';
import { AuthService } from '../auth.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.AUTH_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: TokenPayload) {
    const userPublicId = payload.sub;
    const user = await this.authService.validateAccessToken(userPublicId);
    return user;
  }
}
