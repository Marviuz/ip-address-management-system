import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';
import { paginationSchema } from '@/lib/schemas/pagination';
import { EditNetworkAddressSheet } from '@/features/network-address-data-table/components/edit-network-address-sheet';
import { AddNetworkAddressDialog } from '@/features/network-address-data-table/components/add-network-address-dialog';

const dashboardSearchSchema = paginationSchema.extend({
  edit: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
  validateSearch: zodValidator(dashboardSearchSchema),
});

function DashboardPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            <NetworkAddressDataTable />
          </Suspense>

          <div>
            <AddNetworkAddressDialog />
          </div>
        </div>
      </div>
      <EditNetworkAddressSheet />
    </main>
  );
}
