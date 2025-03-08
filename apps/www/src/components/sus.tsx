import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { getAuthedUser } from '@/lib/services/get-authed-user';

export const UserData: FC = () => {
  const { data: user } = useSuspenseQuery({
    queryKey: ['getAuthedUser'],
    queryFn: getAuthedUser,
  });

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};
