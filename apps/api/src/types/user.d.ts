import { type SelectUserSchema } from './oauth-user';

declare module 'express' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface Request {
    user: SelectUserSchema;
  }
}

export type TokenPayload = {
  sub: string;
};

export type Role = Exclude<SelectUserSchema['role'], null>;
