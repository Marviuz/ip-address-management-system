import {
  type AuditLogsAction,
  type ChangeSchema,
} from '@ip-address-management-system/shared';
import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { TableSortHeader } from './table-sort-header';
import { Route as activityLogsRoute } from '@/routes/_authenticated/activity-logs';
import { DateTimeDetailsHoverCard } from '@/components/datetime-details-hover-card';

export type AdminAuditLogsColumn = {
  logId: string;
  displayName: string;
  action: AuditLogsAction;
  changes: ChangeSchema;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
  recordedAt: Date;
};

const columnHelper = createColumnHelper<AdminAuditLogsColumn>();

export const adminAuditLogsTableColumns = [
  columnHelper.accessor('displayName', {
    header: () => <TableSortHeader sortKey="user">User</TableSortHeader>,
  }),
  columnHelper.accessor('ipAddress', {
    header: () => (
      <TableSortHeader sortKey="ipAddress">IP Address</TableSortHeader>
    ),
    cell: ({ cell }) => cell.getValue(),
  }),
  columnHelper.accessor('action', {
    header: () => <TableSortHeader sortKey="action">Action</TableSortHeader>,
    cell: ({ cell, row }) => (
      <Link
        className="capitalize underline underline-offset-4"
        from={activityLogsRoute.to}
        search={(prev) => ({ ...prev, preview: row.original.logId })}
      >
        {cell.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('recordedAt', {
    header: () => (
      <TableSortHeader sortKey="createdAt">Date Recorded</TableSortHeader>
    ),
    cell: ({ cell }) => (
      <DateTimeDetailsHoverCard
        createdAt={cell.getValue()}
        createdLabel="Date recorded"
      />
    ),
  }),
];
