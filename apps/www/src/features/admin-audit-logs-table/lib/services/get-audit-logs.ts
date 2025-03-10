import { auditLogsListSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type AuditLogsParams = PaginationSchema;

export async function getAuditLogs({ page, pageSize }: AuditLogsParams) {
  const response = await api.get('/audit-logs', {
    params: { page, pageSize },
  });
  return auditLogsListSchema.parse(response.data);
}
