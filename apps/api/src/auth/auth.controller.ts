import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Ip,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  SESSION_COOKIE,
  TOKEN_LABELS,
} from '@ip-address-management-system/shared';
import { env } from 'src/env';
import { UserAgent } from 'src/audit-logs/decorators/user-agent.decorator';
import { InsertUserSchema } from 'src/types/oauth-user';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RefreshGuard } from './guards/refresh/refresh.guard';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

const ONE_DAY = 24 * 60 * 60 * 1000;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle() {
    // Guard redirect
  }

  @Public()
  @Post('register')
  async register(
    @Body() user: InsertUserSchema,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    return await this.authService.register(user, ip, userAgent);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req: Request,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.loginByUserPublicId(
      req.user.publicId,
      'login',
      ip,
      userAgent,
    );

    res.cookie(SESSION_COOKIE, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * ONE_DAY,
    });

    res.json({
      [TOKEN_LABELS.ACCESS_TOKEN]: tokens.accessToken,
      [TOKEN_LABELS.REFRESH_TOKEN]: tokens.refreshToken,
    });
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    const tokens = await this.authService.loginByUserPublicId(
      req.user.publicId,
      'login',
      ip,
      userAgent,
    );

    const urlParams = new URLSearchParams({
      [TOKEN_LABELS.ACCESS_TOKEN]: tokens.accessToken,
      [TOKEN_LABELS.REFRESH_TOKEN]: tokens.refreshToken,
    });

    res.cookie(SESSION_COOKIE, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * ONE_DAY,
    });

    res.redirect(`${env.FRONTEND_URL}/auth/google?${urlParams.toString()}`);
  }

  @Public()
  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.loginByUserPublicId(req.user.publicId);

    res.cookie(SESSION_COOKIE, user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/auth/refresh',
      maxAge: 7 * ONE_DAY,
    });

    res.json({
      [TOKEN_LABELS.ACCESS_TOKEN]: user.accessToken,
      [TOKEN_LABELS.REFRESH_TOKEN]: user.refreshToken,
    });
  }

  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Ip() ip: string | null,
    @UserAgent() userAgent: string | null,
  ) {
    await this.authService.logout(req.user.publicId, ip, userAgent);
    res.clearCookie(TOKEN_LABELS.REFRESH_TOKEN);
    res.sendStatus(HttpStatus.NO_CONTENT);
  }
}
