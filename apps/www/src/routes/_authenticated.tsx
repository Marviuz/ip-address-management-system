import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { refreshToken } from '@/lib/services/refresh-token';
import { Header } from '@/features/header/components';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (!context.auth?.accessToken) {
      const newTokens = await refreshToken();
      if (newTokens.success) {
        context.auth?.setAccessToken(newTokens.data.access_token);
        return;
      }

      return redirect({
        to: '/',
      });
    }
  },
  component: AuthenticatedLayout,
});

export function AuthenticatedLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
