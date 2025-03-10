import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Suspense } from 'react';
import { AdminAuditLogsTable } from '@/features/admin-audit-logs-table/common';
import { AuditLogsTablePagination } from '@/features/admin-audit-logs-table/common/audit-logs-table-pagination';
import { paginationSchema } from '@/lib/schemas/pagination';

export const Route = createFileRoute('/_authenticated/activity-logs/')({
  component: ActivityLogsPage,
  validateSearch: zodValidator(paginationSchema),
});

function ActivityLogsPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            <AdminAuditLogsTable />
          </Suspense>
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
