import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { refreshToken } from '@/lib/services/refresh-token';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    if (context.auth?.accessToken) return;

    const newTokens = await refreshToken();

    if (newTokens.success) {
      context.auth?.setAccessToken(newTokens.data.access_token);
      return;
    }
    return redirect({
      to: '/',
    });
  },
  component: Layout,
});

export function Layout() {
  return <Outlet />;
}
