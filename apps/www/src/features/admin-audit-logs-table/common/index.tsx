import { type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { adminAuditLogsTableColumns } from './columns';
import { useTable } from '@/hooks/use-table';
import { DataTable } from '@/components/common/data-table';
import { queries } from '@/lib/queries';

export const AdminAuditLogsTable: FC = () => {
  const { page, pageSize } = useSearch({
    from: '/_authenticated/activity-logs/',
  });
  const { data: logsData } = useSuspenseQuery(
    queries.auditLogs.all({ page, pageSize }),
  );

  const table = useTable({
    data: logsData.items.map((logItem) => ({
      action: logItem.action,
      changes: 'change',
      ipAddress: logItem.ipAddress,
      metadata: 'meta',
      user: logItem.user.givenName,
      userAgent: logItem.userAgent,
    })),
    columns: adminAuditLogsTableColumns,
  });

  return (
    <>
      {/* <pre>{JSON.stringify(logsData, null, 2)}</pre> */}
      <DataTable table={table} />
    </>
  );
};
