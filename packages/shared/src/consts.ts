export const TOKEN_LABELS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const roles = ['super_admin', 'regular'] as const;
export type Role = (typeof roles)[number];

export const SESSION_COOKIE = '__x_auth_sess__';

export const auditLogsEntity = ['network_address', 'user'] as const;
export type AuditLogsEntity = (typeof auditLogsEntity)[number];

export const auditLogsActions = [
  'create',
  'update',
  'delete',
  'login',
  'logout',
] as const;
export type AuditLogsAction = (typeof auditLogsActions)[number];

export const providers = ['google', 'local'] as const;
export type Provider = (typeof providers)[number];

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
