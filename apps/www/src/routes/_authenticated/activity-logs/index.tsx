import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { z } from 'zod';
import { AdminAuditLogsTable } from '@/features/admin-audit-logs-table/components';
import { AuditLogsTablePagination } from '@/features/admin-audit-logs-table/components/audit-logs-table-pagination';
import { paginationSchema } from '@/lib/schemas/pagination';
import { AuditLogDetailsSheet } from '@/features/admin-audit-logs-table/components/audit-log-details-sheet';

const routeSchema = paginationSchema.extend({
  preview: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/activity-logs/')({
  component: ActivityLogsPage,
  validateSearch: zodValidator(routeSchema),
});

function ActivityLogsPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
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
    </main>
  );
}
