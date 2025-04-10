import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { z } from 'zod';
import { getAuditLogsSchema } from '@ip-address-management-system/shared';
import { AdminAuditLogsTable } from '@/features/admin-audit-logs-table/components';
import { AuditLogsTablePagination } from '@/features/admin-audit-logs-table/components/audit-logs-table-pagination';
import { AuditLogDetailsSheet } from '@/features/admin-audit-logs-table/components/audit-log-details-sheet';
import { queries } from '@/lib/queries';
import { DataTableSkeleton } from '@/components/common/data-table-skeleton';
import { adminAuditLogsTableColumns } from '@/features/admin-audit-logs-table/components/columns';
import { AuditLogsSearchInput } from '@/features/audit-logs-search-input/components';
import { AuditLogsFilters } from '@/features/audit-logs-filters/components';

const routeSchema = getAuditLogsSchema.extend({
  preview: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/activity-logs/')({
  component: ActivityLogsPage,
  validateSearch: zodValidator(routeSchema),
  beforeLoad: async ({ context }) => {
    const { role } = await context.queryClient.fetchQuery(queries.users.me);
    if (role !== 'super_admin') {
      return redirect({
        to: '/dashboard',
      });
    }
  },
});

function ActivityLogsPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8">
          <h1 className="text-2xl font-bold">Activity Logs</h1>
          <div className="flex justify-end gap-4">
            <AuditLogsFilters />
            <AuditLogsSearchInput />
          </div>
          <div className="grid gap-4">
            <Suspense
              fallback={
                <DataTableSkeleton columns={adminAuditLogsTableColumns} />
              }
            >
              <AdminAuditLogsTable />
            </Suspense>
            <AuditLogDetailsSheet />
            <div className="flex justify-end">
              <Suspense fallback={<div>Loading...</div>}>
                <AuditLogsTablePagination />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
