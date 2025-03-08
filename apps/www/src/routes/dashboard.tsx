import { createFileRoute } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context/use-auth';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const accessToken = useAuth();

  return <div>Hello {accessToken?.accessToken} /dashboard!</div>;
}
