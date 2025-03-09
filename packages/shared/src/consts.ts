export const TOKEN_LABELS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const roles = ['super_admin', 'regular'] as const;
export type Role = (typeof roles)[number];

export const SESSION_COOKIE = '__x_auth_sess__';
