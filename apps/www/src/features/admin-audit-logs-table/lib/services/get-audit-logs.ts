import {
  auditLogsListSchema,
  type GetAuditLogsSchema,
} from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type AuditLogsParams = PaginationSchema & GetAuditLogsSchema;

export async function getAuditLogs({
  page,
  pageSize,
  q,
  actions,
  sort,
  order,
}: AuditLogsParams) {
  const response = await api.get('/audit-logs', {
    params: { page, pageSize, q, actions, sort, order },
  });
  return auditLogsListSchema.parse(response.data);
}
