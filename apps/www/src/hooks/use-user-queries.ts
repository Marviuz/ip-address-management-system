import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { queries } from '@/lib/queries';

export function useSuspenseAuthedUser() {
  return useSuspenseQuery(queries.users.me);
}

export function useAuthedUser() {
  return useQuery(queries.users.me);
}
