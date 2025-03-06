import { roles } from '@ip-address-management-system/shared';
import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { nanoid } from 'nanoid';

export const users = pgTable('user', {
  id: serial().primaryKey(),
  publicId: varchar('public_id')
    .notNull()
    .unique()
    .$defaultFn(() => nanoid()),

  username: varchar(),
  givenName: varchar('given_name'),
  middleName: varchar('middle_name'),
  familyName: varchar('family_name'),
  email: varchar().unique(),
  role: varchar({ enum: roles }),

  provider: varchar({ enum: ['google'] }).notNull(),
  providerId: varchar('provider_id').notNull().unique(),
  refreshToken: varchar('refresh_token'),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  }).$onUpdate(() => new Date()),
});

export const networkAddresses = pgTable('network_address', {
  id: serial().primaryKey(),
  publicId: varchar('public_id')
    .notNull()
    .unique()
    .$defaultFn(() => nanoid()),

  networkAddress: varchar('network_address').notNull(),
  label: varchar().notNull(),
  comments: varchar(),

  addedBy: integer('added_by')
    .notNull()
    .references(() => users.id),

  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true,
  }).$onUpdate(() => new Date()),
});
