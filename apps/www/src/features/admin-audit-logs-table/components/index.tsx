import { type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { adminAuditLogsTableColumns } from './columns';
import { useTable } from '@/hooks/use-table';
import { DataTable } from '@/components/common/data-table';
import { queries } from '@/lib/queries';
import { auditLogsApiTableAdapter } from '@/lib/adapters/audit-logs-api-table-adapter';

export const AdminAuditLogsTable: FC = () => {
  const { page, pageSize } = useSearch({
    from: '/_authenticated/activity-logs/',
  });
  const { data: logsData } = useSuspenseQuery(
    queries.auditLogs.all({ page, pageSize }),
  );

  const table = useTable({
    data: auditLogsApiTableAdapter(logsData.items),
    columns: adminAuditLogsTableColumns,
  });

  return (
    <>
      {/* <pre>{JSON.stringify(logsData, null, 2)}</pre> */}
      <DataTable table={table} />
    </>
  );
};
