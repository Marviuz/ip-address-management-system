import { AuditLogsAction } from '@ip-address-management-system/shared';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { InsertUserSchema } from 'src/types/oauth-user';
import { TokenPayload } from 'src/types/user';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    user: InsertUserSchema,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const foundUser = await this.userService.findOneByEmail(user.email);
    if (foundUser) throw new ConflictException('Email already exists!');

    const createUser = await this.userService.createUser(
      user,
      ipAddress,
      userAgent,
    );
    if (!createUser) throw new Error('Failed to create user');
    return { message: 'Successfully registered!' };
  }

  async findOneByEmail(email: string) {
    return this.userService.findOneByEmail(email);
  }

  async generateTokens(userPublicId: string) {
    const payload: TokenPayload = { sub: userPublicId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');
    if (!user.password)
      throw new ConflictException(
        'Email is linked to a different login method.',
      );

    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    return user;
  }

  async loginByUserPublicId(
    userPublicId: string,
    ...params: [AuditLogsAction, string | null, string | null] | []
  ) {
    const { accessToken, refreshToken } =
      await this.generateTokens(userPublicId);

    const hashedRefreshToken = await hash(refreshToken);

    const updatedUser = await this.userService.updateUser(
      {
        refreshToken: hashedRefreshToken,
        publicId: userPublicId,
      },
      ...params,
    );

    if (!updatedUser)
      throw new Error('Failed to update User with refreshToken');

    return { ...updatedUser, accessToken, refreshToken };
  }

  async logout(
    userPublicId: string,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    return this.userService.updateUser(
      {
        publicId: userPublicId,
        refreshToken: null,
      },
      'logout',
      ipAddress,
      userAgent,
    );
  }

  async validateGoogleUser(
    oauthUser: InsertUserSchema,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const user = await this.userService.findOneOrCreate(
      oauthUser,
      ipAddress,
      userAgent,
    );

    if (!user) throw new Error('Failed to find or create User');

    return user;
  }

  async validateAccessToken(userPublicId: string) {
    const user = await this.userService.findOneByPublicId(userPublicId);
    if (!user) throw new UnauthorizedException('User not found!');
    return user;
  }

  async validateRefreshToken(userPublicId: string, refreshToken: string) {
    const user = await this.userService.findOneByPublicId(userPublicId);
    if (!user?.refreshToken) throw new UnauthorizedException('User not found!');

    const isTokenValid = await verify(user.refreshToken, refreshToken);
    if (!isTokenValid) throw new UnauthorizedException('Invalid token!');

    return user;
  }

  extractBearerTokenFromAuthHeader(authorization?: string) {
    if (!authorization)
      throw new UnauthorizedException('No authorization header!');

    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer')
      throw new UnauthorizedException('Invalid authorization header!');

    if (!token)
      throw new UnauthorizedException('No token in authorization header!');

    return token;
  }
}
