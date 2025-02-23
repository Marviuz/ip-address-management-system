import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtService) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user) {
      throw new Error('User not found');
    }

    const accessToken = this.jwtAuthService.sign(req.user);

    res.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });

    return res.send({
      accessToken,
    });
  }
}
