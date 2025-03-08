import { useMutation } from '@tanstack/react-query';
import { api } from '../api-client';

export async function logout() {
  await api.post('/auth/logout');
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
  });
}
