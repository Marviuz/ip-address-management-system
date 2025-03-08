'use server';

import { userSchema } from '@ip-address-management-system/shared';
import { api } from '../api-client';

export async function getAuthedUser() {
  return api.private((client) => client.get('users/me').json(), userSchema);
}
