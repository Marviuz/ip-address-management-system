import { auditLogsSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export type AuditLogByPublicId = {
  publicId: string;
};

export async function getAuditLogByPublicId({ publicId }: AuditLogByPublicId) {
  const response = await api.get(`/audit-logs/${publicId}`);
  return auditLogsSchema.parse(response.data);
}
