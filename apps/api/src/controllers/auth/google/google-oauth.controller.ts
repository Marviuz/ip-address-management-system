import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { env } from 'src/env';
import { GoogleOauthGuard } from 'src/guards/google-oauth/google-oauth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class GoogleOauthController {
  constructor(
    private jwtAuthService: JwtService,
    private authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.login(req.user.publicId);

    const urlParams = new URLSearchParams({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    res.redirect(`${env.FRONTEND_URL}/auth/google?${urlParams.toString()}`);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.user.publicId);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
