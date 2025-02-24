import { z } from 'zod';

export const env = z
  .object({
    DATABASE_URL: z.string(),
    AUTH_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string(),
    FRONTEND_URL: z.string(),
  })
  .parse(process.env);
