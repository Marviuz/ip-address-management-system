import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  shared: {
    BACKEND_URL: z.string(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
