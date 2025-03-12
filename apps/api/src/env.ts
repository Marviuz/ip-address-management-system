import { z } from 'zod';

export const env = z
  .object({
    DATABASE_URL: z.string().min(1, 'Missing Environment Variable'),
    AUTH_SECRET: z.string().min(1, 'Missing Environment Variable'),
    GOOGLE_CLIENT_ID: z.string().min(1, 'Missing Environment Variable'),
    GOOGLE_CLIENT_SECRET: z.string().min(1, 'Missing Environment Variable'),
    GOOGLE_CALLBACK_URL: z.string().min(1, 'Missing Environment Variable'),
    FRONTEND_URL: z.string().min(1, 'Missing Environment Variable'),
  })
  .parse(process.env);
