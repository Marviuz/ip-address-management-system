import { type TokenSchema } from '@ip-address-management-system/shared';
import { api } from '../api-client';

export async function refreshToken() {
  try {
    const { data } = await api.post<TokenSchema>('/auth/refresh', null, {
      withCredentials: true,
    });
    return { success: true, data } as const;
  } catch {
    return { success: false } as const;
  }
}
