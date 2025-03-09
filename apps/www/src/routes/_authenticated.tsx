import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/common/button';
import { useLogout } from '@/hooks/use-logout';

export const Route = createFileRoute('/_authenticated')({
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
