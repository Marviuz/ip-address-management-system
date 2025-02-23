import assert from 'node:assert';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

assert(process.env.DATABASE_URL);

export const db = drizzle(process.env.DATABASE_URL, { schema });
