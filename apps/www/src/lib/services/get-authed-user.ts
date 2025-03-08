import { api } from '../api-client';

export async function getAuthedUser() {
  const { data } = await api.get<unknown>('/users/me');
  return data;
}
