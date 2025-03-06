import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from 'drizzle-zod';
import { type z } from 'zod';
import { networkAddresses } from 'src/drizzle/schema';

export const selectNetworkAddressSchema = createSelectSchema(networkAddresses);
export type SelectNetworkAddressSchema = z.infer<
  typeof selectNetworkAddressSchema
>;
export const insertNetworkAddressSchema = createInsertSchema(networkAddresses);
export type InsertNetworkAddressSchema = z.infer<
  typeof insertNetworkAddressSchema
>;
export const updateNetworkAddressSchema = createUpdateSchema(networkAddresses);
export type UpdateNetworkAddressSchema = z.infer<
  typeof updateNetworkAddressSchema
>;
