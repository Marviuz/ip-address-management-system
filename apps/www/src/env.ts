import { z } from 'zod';

export const env = z
  .object({
    VITE_BACKEND_URL: z.string().min(1, 'Missing Environment Variable'),
  })
  .parse(import.meta.env);
