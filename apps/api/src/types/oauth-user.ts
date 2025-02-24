import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { type z } from 'zod';
import { users } from 'src/drizzle/schema';

export const selectUserSchema = createSelectSchema(users);
export type SelectUserSchema = z.infer<typeof selectUserSchema>;
export const insertUserSchema = createInsertSchema(users);
export type InsertUserSchema = z.infer<typeof insertUserSchema>;
export const updateUserSchema = createUpdateSchema(users);
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
