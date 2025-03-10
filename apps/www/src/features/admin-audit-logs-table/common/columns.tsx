import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';

type AdminAuditLogsColumn = {
  user: string;
  action: string;
  changes: string;
  ipAddress: string;
  userAgent: string;
  metadata: string;
};

const columnHelper = createColumnHelper<AdminAuditLogsColumn>();

export const adminAuditLogsTableColumns: ColumnDef<
  AdminAuditLogsColumn,
  keyof AdminAuditLogsColumn
>[] = [
  columnHelper.accessor('user', {
    header: 'User',
  }),
  columnHelper.accessor('action', {
    header: 'Action',
  }),
  columnHelper.accessor('changes', {
    header: 'Changes',
  }),
  columnHelper.accessor('ipAddress', {
    header: 'IP Address',
  }),
  columnHelper.accessor('userAgent', {
    header: 'User Agent',
  }),
  columnHelper.accessor('metadata', {
    header: 'Metadata',
  }),
];
