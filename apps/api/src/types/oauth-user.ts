import { z } from 'zod';

export const oauthUserSchema = z.object({
  provider: z.literal('google'),
  providerId: z.string(),
  email: z.string(),
  givenName: z.string(),
  familyName: z.string(),
  middleName: z.string(),
  username: z.string(),
});

export type OAuthUserSchema = z.infer<typeof oauthUserSchema>;
