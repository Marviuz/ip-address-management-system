import { roles } from '@ip-address-management-system/shared';
import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
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
