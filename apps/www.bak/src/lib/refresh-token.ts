'use server';

import { tokenSchema } from '@ip-address-management-system/shared';
import { jwtDecode } from 'jwt-decode';
import { getAuthSession, signIn } from './auth';

export async function refreshToken() {
  const { data: session } = await getAuthSession();
  if (!session) throw new Error('Unauthenticated');

  const { exp } = jwtDecode(session.accessToken);
  if (!exp) throw new Error('No expiration date');

  const isExpired = Date.now() >= exp * 1000;

  if (isExpired) {
    try {
      const response = await fetch('http://localhost:8000/auth/refresh', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.refreshToken}`,
        },
      });

      const data = await response.json();
      const newTokens = tokenSchema.safeParse(data);
      if (newTokens.success) {
        await signIn({
          accessToken: newTokens.data.access_token,
          refreshToken: newTokens.data.refresh_token,
        });
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      // eslint-disable-next-line no-console -- Log errors
      console.log('[Refresh Token Error]', e);
      return { success: false };
    }
  }

  return { success: true };
}
