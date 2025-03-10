import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  type AuditLogsParams,
  getAuditLogs,
} from '@/features/admin-audit-logs-table/lib/services/get-audit-logs';

export const auditLogQueries = createQueryKeys('auditLogs', {
  all: (params: AuditLogsParams) => ({
    queryKey: [params],
    queryFn: () => getAuditLogs(params),
  }),
});
