import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  type AuditLogByPublicId,
  getAuditLogByPublicId,
} from '@/features/admin-audit-logs-table/lib/services/get-audit-log-by-public-id';
import {
  type AuditLogsParams,
  getAuditLogs,
} from '@/features/admin-audit-logs-table/lib/services/get-audit-logs';

export const auditLogQueries = createQueryKeys('auditLogs', {
  all: (params: AuditLogsParams) => ({
    queryKey: [params],
    queryFn: () => getAuditLogs(params),
  }),
  byPublicId: (params: AuditLogByPublicId) => ({
    queryKey: [params],
    queryFn: () => getAuditLogByPublicId(params),
  }),
});
