import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { refreshToken } from '@/lib/services/refresh-token';
import { Button } from '@/components/common/button';
import { useLogout } from '@/hooks/use-logout';

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
  component: AuthenticatedLayout,
});

export function AuthenticatedLayout() {
  const { logout } = useLogout();

  return (
    <div>
      <Outlet />
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
