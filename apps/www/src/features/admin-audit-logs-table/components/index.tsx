import { type FC } from 'react';
import { useSearch } from '@tanstack/react-router';
import { adminAuditLogsTableColumns } from './columns';
import { useTable } from '@/hooks/use-table';
import { DataTable } from '@/components/common/data-table';
import { auditLogsApiTableAdapter } from '@/lib/adapters/audit-logs-api-table-adapter';
import { useAllAuditLogs } from '@/hooks/use-audit-log-queries';

export const AdminAuditLogsTable: FC = () => {
  const { preview: _, ...search } = useSearch({
    from: '/_authenticated/activity-logs/',
  });
  const { data: logsData } = useAllAuditLogs(search);

  const table = useTable({
    data: auditLogsApiTableAdapter(logsData.items),
    columns: adminAuditLogsTableColumns,
  });

  return <DataTable table={table} />;
};
