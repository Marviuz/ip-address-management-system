import {
  type AuditLogsAction,
  type ChangeSchema,
} from '@ip-address-management-system/shared';
import { Link } from '@tanstack/react-router';
import { createColumnHelper } from '@tanstack/react-table';
import { Route as activityLogsRoute } from '@/routes/_authenticated/activity-logs';

export type AdminAuditLogsColumn = {
  logId: string;
  displayName: string;
  action: AuditLogsAction;
  changes: ChangeSchema;
  ipAddress: string;
  userAgent: string;
  metadata: Record<string, unknown>;
};

const columnHelper = createColumnHelper<AdminAuditLogsColumn>();

export const adminAuditLogsTableColumns = [
  columnHelper.accessor('displayName', {
    header: 'User',
  }),
  columnHelper.accessor('ipAddress', {
    header: 'IP Address',
    cell: ({ cell }) => cell.getValue(),
  }),
  columnHelper.accessor('action', {
    header: 'Action',
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
];
