import { type drizzle } from 'drizzle-orm/node-postgres';
import type * as schema from '../schema';

export type DrizzleDatabase = ReturnType<typeof drizzle<typeof schema>>;
