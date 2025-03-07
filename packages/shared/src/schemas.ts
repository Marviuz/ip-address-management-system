import { z } from 'zod';
import { TOKEN_LABELS } from './consts';
import { createListSchema } from './utils';

export const tokenSchema = z.object({
  [TOKEN_LABELS.ACCESS_TOKEN]: z.string(),
  [TOKEN_LABELS.REFRESH_TOKEN]: z.string(),
});
export type TokenSchema = z.infer<typeof tokenSchema>;

export const userSchema = z.object({
  publicId: z.string(),
  username: z.string().nullable(),
  givenName: z.string(),
  middleName: z.string().nullable(),
  familyName: z.string().nullable(),
  email: z.string(),
  role: z.string(),
  provider: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const networkAddressSchema = z.object({
  publicId: z.string(),
  networkAddress: z.string(),
  label: z.string(),
  comments: z.string(),
  addedBy: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.string(),
});
export type NetworkAddressSchema = z.infer<typeof networkAddressSchema>;

export const networkAddressListSchema = createListSchema(
  networkAddressSchema.extend({
    addedBy: userSchema,
  }),
);
export type NetworkAddressListSchema = z.infer<typeof networkAddressListSchema>;
