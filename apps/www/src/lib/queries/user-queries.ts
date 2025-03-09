import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getAuthedUser } from '../services/get-authed-user';

export const users = createQueryKeys('users', {
  me: {
    queryKey: null,
    queryFn: () => getAuthedUser(),
  },
});
