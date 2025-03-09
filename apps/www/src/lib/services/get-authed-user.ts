import { userSchema } from '@ip-address-management-system/shared';
import { api } from '../api-client';

export async function getAuthedUser() {
  const response = await api.get('/users/me');
  return userSchema.parse(response.data);
}
