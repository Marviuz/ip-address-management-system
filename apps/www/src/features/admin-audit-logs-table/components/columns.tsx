import {
  type AuditLogsAction,
  type ChangeSchema,
} from '@ip-address-management-system/shared';
import { createColumnHelper } from '@tanstack/react-table';

export type AdminAuditLogsColumn = {
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
    cell: ({ cell }) => cell.getValue(),
  }),
];
