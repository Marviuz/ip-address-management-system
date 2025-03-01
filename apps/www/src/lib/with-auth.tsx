import { redirect } from 'next/navigation';
import { type ComponentType } from 'react';
import { getHomeLink } from '@/components/links/home-link';
import { getAuthSession, type Session } from './auth';

type ComponentParams = {
  $auth: Session;
};

export function withAuth<T extends object>(
  Component: ComponentType<T & ComponentParams>,
) {
  return async function AuthedComponent(props: T) {
    const auth = await getAuthSession();
    if (!auth.data) {
      return redirect(getHomeLink());
    }

    return <Component {...props} $auth={auth} />;
  };
}
