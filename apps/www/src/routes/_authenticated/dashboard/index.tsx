import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { Suspense } from 'react';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';
import { paginationSchema } from '@/lib/schemas/pagination';
import { EditNetworkAddressSheet } from '@/features/network-address-data-table/components/edit-network-address-sheet';
import { DataTableSkeleton } from '@/components/common/data-table-skeleton';
import { networkAddressTableColumns } from '@/features/network-address-data-table/components/columns';
import { NetworkAddressSearchInput } from '@/features/network-address-search-input/components';

const dashboardSearchSchema = paginationSchema.extend({
  edit: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: DashboardPage,
  validateSearch: zodValidator(dashboardSearchSchema),
  search: {
    middlewares: [retainSearchParams(['page', 'pageSize'])],
  },
});

function DashboardPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          <h1 className="text-2xl font-bold">IP Addresses</h1>
          <div className="flex justify-end">
            <div>
              <NetworkAddressSearchInput />
            </div>
          </div>
          <Suspense
            fallback={
              <DataTableSkeleton columns={networkAddressTableColumns} />
            }
          >
            <NetworkAddressDataTable />
          </Suspense>
        </div>
      </div>
      <EditNetworkAddressSheet />
    </main>
  );
}
