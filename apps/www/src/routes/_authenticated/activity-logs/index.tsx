import { createFileRoute, redirect } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { z } from 'zod';
import { AdminAuditLogsTable } from '@/features/admin-audit-logs-table/components';
import { AuditLogsTablePagination } from '@/features/admin-audit-logs-table/components/audit-logs-table-pagination';
import { paginationSchema } from '@/lib/schemas/pagination';
import { AuditLogDetailsSheet } from '@/features/admin-audit-logs-table/components/audit-log-details-sheet';
import { queries } from '@/lib/queries';

const routeSchema = paginationSchema.extend({
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
          <div className="grid gap-4">
            <Suspense fallback={<div>Loading...</div>}>
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
