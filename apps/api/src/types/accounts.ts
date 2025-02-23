import { createInsertSchema } from 'drizzle-zod';
import { type z } from 'zod';
import { accounts } from 'src/modules/drizzle/schema';

export const insertAccountSchema = createInsertSchema(accounts);
export type InsertAccountSchema = z.infer<typeof insertAccountSchema>;
