import { type QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { type AuthContextType } from '@/contexts/auth-context/core';

type AppContext = {
  auth: AuthContextType | null;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<AppContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
