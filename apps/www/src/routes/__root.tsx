import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { type AuthContextType } from '@/contexts/auth-context/core';

type AuthRouteContext = {
  auth: AuthContextType | null;
};

export const Route = createRootRouteWithContext<AuthRouteContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
