import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { UserData } from '@/components/sus';
import { useAuth } from '@/contexts/auth-context/use-auth';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  const accessToken = useAuth();

  return (
    <div>
      Hello {accessToken?.accessToken} /dashboard!
      <Suspense fallback={<div>Loading...</div>}>
        <UserData />
      </Suspense>
    </div>
  );
}
