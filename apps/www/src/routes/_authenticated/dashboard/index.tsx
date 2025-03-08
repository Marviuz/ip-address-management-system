import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { UserData } from '@/components/sus';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <UserData />
      </Suspense>
    </div>
  );
}
