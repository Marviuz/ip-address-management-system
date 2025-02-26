import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from 'src/env';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshGuard } from './guards/refresh/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle() {
    // Guard redirect
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const tokens = await this.authService.login(req.user.publicId);

    const urlParams = new URLSearchParams({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    });

    res.redirect(`${env.FRONTEND_URL}/auth/google?${urlParams.toString()}`);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request) {
    const tokens = await this.authService.generateTokens(req.user.publicId);
    return tokens;
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req.user.publicId);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
