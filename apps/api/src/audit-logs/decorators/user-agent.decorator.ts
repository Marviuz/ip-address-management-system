import { createParamDecorator } from '@nestjs/common';
import { type Request } from 'express';

export const UserAgent = createParamDecorator((data: unknown, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request.headers['user-agent'] ?? null;
});
