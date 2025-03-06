import { z, type ZodSchema, type ZodTypeDef } from 'zod';

export function createPaginatedSchema<TOut, TDef extends ZodTypeDef, TIn>(
  schema: ZodSchema<TOut, TDef, TIn>,
) {
  return z.object({
    data: schema,
    pagination: z.object({
      currentPage: z.number(),
      pageSize: z.number(),
      totalPages: z.number(),
      totalItems: z.number(),
    }),
  });
}
