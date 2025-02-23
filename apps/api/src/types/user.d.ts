import { type OAuthUserSchema } from './oauth-user';

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface Request {
    user: OAuthUserSchema;
  }
}
