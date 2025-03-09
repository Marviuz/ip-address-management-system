import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type NetworkAddressParams = PaginationSchema;

export async function getNetworkAddress({
  page,
  pageSize,
}: NetworkAddressParams) {
  const { data } = await api.get<unknown>(`network-address`, {
    params: { page, pageSize },
  });
  return networkAddressListSchema.parse(data);
}
