import { z } from 'zod';
import { TOKEN_LABELS } from './consts';

export const tokenSchema = z.object({
  [TOKEN_LABELS.ACCESS_TOKEN]: z.string(),
  [TOKEN_LABELS.REFRESH_TOKEN]: z.string(),
});

export type TokenSchema = z.infer<typeof tokenSchema>;
