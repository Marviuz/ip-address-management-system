import {
  serial,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('user', {
  id: serial().primaryKey(),
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

export const accounts = pgTable('account', {
  id: serial().primaryKey(),
  publicId: varchar()
    .notNull()
    .unique()
    .$defaultFn(() => nanoid()),

  provider: varchar({ enum: ['google'] }).notNull(),
  providerAccountId: varchar().notNull(),
  refreshToken: varchar('refresh_token'),
  accessToken: varchar('access_token'),
  expiresAt: integer('expires_at'),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id),

  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true }),
  updatedAt: timestamp('created_at', { mode: 'date', withTimezone: true }),
});
