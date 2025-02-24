import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from 'src/guards/google-oauth/google-oauth.guard';
import { AuthService } from 'src/services/auth/auth.service';

// const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private jwtAuthService: JwtService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.login(req.user.providerId);

    return res.send(tokens);
  }
}
