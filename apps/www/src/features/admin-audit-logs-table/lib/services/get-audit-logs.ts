import {
  auditLogsListSchema,
  type GetAuditLogsListPayload,
} from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type AuditLogsParams = PaginationSchema & GetAuditLogsListPayload;

export async function getAuditLogs({
  page,
  pageSize,
  q,
  actions,
}: AuditLogsParams) {
  const response = await api.get('/audit-logs', {
    params: { page, pageSize, q, actions },
  });
  return auditLogsListSchema.parse(response.data);
}
