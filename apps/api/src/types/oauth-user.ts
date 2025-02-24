import { z } from 'zod';

export const oauthUserSchema = z.object({
  provider: z.literal('google'),
  providerId: z.string(),
  email: z.string(),
  givenName: z.string(),
  familyName: z.string().nullish(),
  middleName: z.string().nullish(),
  username: z.string().nullish(),
});

export type OAuthUserSchema = z.infer<typeof oauthUserSchema>;
