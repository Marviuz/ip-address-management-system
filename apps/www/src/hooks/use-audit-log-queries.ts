import { useSuspenseQuery } from '@tanstack/react-query';
import { queries } from '@/lib/queries';
import { type AuditLogsParams } from '@/features/admin-audit-logs-table/lib/services/get-audit-logs';
import { type AuditLogByPublicId } from '@/features/admin-audit-logs-table/lib/services/get-audit-log-by-public-id';

export function useAllAuditLogs(params: AuditLogsParams) {
  return useSuspenseQuery(queries.auditLogs.all(params));
}

export function useAuditLogByPublicId(params: AuditLogByPublicId) {
  return useSuspenseQuery(queries.auditLogs.byPublicId(params));
}
