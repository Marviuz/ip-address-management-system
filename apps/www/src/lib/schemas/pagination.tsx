import { z } from 'zod';

export const paginationSchema = z.object({
  page: z.number().catch(1),
  pageSize: z.number().catch(10),
});

export type PaginationSchema = z.infer<typeof paginationSchema>;
