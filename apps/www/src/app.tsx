import { RouterProvider } from '@tanstack/react-router';
import { type FC } from 'react';
import { useAuth } from './contexts/auth-context/use-auth';
import { router } from './lib/router';

export const App: FC = () => {
  const auth = useAuth();
  return <RouterProvider context={{ auth }} router={router} />;
};
