import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getAuthedUser } from '../services/get-authed-user';

export const userQueries = createQueryKeys('users', {
  me: {
    queryKey: null,
    queryFn: () => getAuthedUser(),
  },
});
