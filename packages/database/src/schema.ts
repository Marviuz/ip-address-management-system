import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('users', {
  id: integer().primaryKey(),
  publicId: varchar()
    .notNull()
    .unique()
    .$defaultFn(() => nanoid()),
  username: varchar(),
  givenName: varchar('given_name'),
  familyName: varchar('family_name'),
  email: varchar(),
  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }),
  updatedAt: timestamp('created_at', { mode: 'date', withTimezone: true }),
});
