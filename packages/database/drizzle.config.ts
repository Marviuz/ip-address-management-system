import { defineConfig } from 'drizzle-kit';
import assert from 'node:assert';

assert(process.env.DATABASE_URL, 'DATABASE_URL is not set');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
