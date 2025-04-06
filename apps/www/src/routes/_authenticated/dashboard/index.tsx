import { getNetworkAddressSchema } from '@ip-address-management-system/shared';
import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { z } from 'zod';
import { DataTableSkeleton } from '@/components/common/data-table-skeleton';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';
import { networkAddressTableColumns } from '@/features/network-address-data-table/components/columns';
import { EditNetworkAddressSheet } from '@/features/network-address-data-table/components/edit-network-address-sheet';
import { NetworkAddressFilter } from '@/features/network-address-filter/components';
import { NetworkAddressSearchInput } from '@/features/network-address-search-input/components';

const dashboardSearchSchema = getNetworkAddressSchema.extend({
  edit: z.string().optional(),
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
          <div className="flex justify-end gap-4">
            <NetworkAddressFilter />
            <NetworkAddressSearchInput />
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
