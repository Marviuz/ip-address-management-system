import assert from 'node:assert';
import { drizzle } from 'drizzle-orm/node-postgres';

// TODO: use env validator
assert(process.env.DATABASE_URL, 'DATABASE_UR is not set');

export const db = drizzle(process.env.DATABASE_URL);
