import type { AuditLogsListSchema } from '@ip-address-management-system/shared';
import type { AdminAuditLogsColumn } from '@/features/admin-audit-logs-table/components/columns';

export function auditLogsApiTableAdapter(
  items: AuditLogsListSchema['items'],
): AdminAuditLogsColumn[] {
  return items.map((item) => ({
    logId: item.publicId,
    action: item.action,
    changes: item.changes,
    ipAddress: item.ipAddress,
    metadata: item.metadata,
    displayName:
      item.user.username ??
      `${item.user.givenName} ${item.user.familyName ?? ''}`,
    userAgent: item.userAgent,
  }));
}
