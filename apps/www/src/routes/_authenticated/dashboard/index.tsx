import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <NetworkAddressDataTable />
        </Suspense>
      </div>
    </main>
  );
}
