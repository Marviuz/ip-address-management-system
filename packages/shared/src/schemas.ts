import { z } from 'zod';
import {
  auditLogsActions,
  auditLogsEntity,
  networkTypes,
  roles,
  TOKEN_LABELS,
} from './consts';
import { createListSchema } from './utils';

export const tokenSchema = z.object({
  [TOKEN_LABELS.ACCESS_TOKEN]: z.string(),
  [TOKEN_LABELS.REFRESH_TOKEN]: z.string(),
});
export type TokenSchema = z.infer<typeof tokenSchema>;

export const userSchema = z.object({
  publicId: z.string(),
  username: z.string().nullable(),
  givenName: z.string(),
  middleName: z.string().nullable(),
  familyName: z.string().nullable(),
  email: z.string(),
  role: z.enum(roles),
  provider: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type UserSchema = z.infer<typeof userSchema>;

export const networkAddressSchema = z.object({
  publicId: z.string(),
  networkAddress: z.string(),
  label: z.string(),
  type: z.enum(networkTypes),
  comments: z.string(),
  addedBy: userSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type NetworkAddressSchema = z.infer<typeof networkAddressSchema>;

export const networkAddressListSchema = createListSchema(networkAddressSchema);
export type NetworkAddressListSchema = z.infer<typeof networkAddressListSchema>;

export const primitiveSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.symbol(),
  z.bigint(),
  z.date(),
]);
export type PrimitiveSchema = z.infer<typeof primitiveSchema>;
export const changeSchema = z.record(
  z.object({ old: primitiveSchema, new: primitiveSchema }),
);
export type ChangeSchema = z.infer<typeof changeSchema>;

export const auditLogsSchema = z.object({
  publicId: z.string(),
  entity: z.enum(auditLogsEntity),
  entityId: z.number(),
  action: z.enum(auditLogsActions),
  changes: changeSchema,
  ipAddress: z.string(),
  userAgent: z.string(),
  metadata: z.record(z.any()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: userSchema,
});
export type AuditLogsSchema = z.infer<typeof auditLogsSchema>;

export const auditLogsListSchema = createListSchema(auditLogsSchema);
export type AuditLogsListSchema = z.infer<typeof auditLogsListSchema>;
