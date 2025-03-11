import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { refreshToken } from '@/lib/services/refresh-token';
import { Header } from '@/features/header/components';
import { AdminSidebar } from '@/features/admin-sidebar/components';
import { useAuthedUser } from '@/hooks/use-user-queries';

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
  const { data: user } = useAuthedUser();

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <div className="flex">
      {isSuperAdmin ? <AdminSidebar /> : null}
      <div className="grow">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
