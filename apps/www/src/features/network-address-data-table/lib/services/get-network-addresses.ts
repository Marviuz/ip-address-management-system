import {
  type GetNetworkAddressSchema,
  networkAddressListSchema,
} from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type NetworkAddressParams = PaginationSchema & GetNetworkAddressSchema;

export async function getNetworkAddress({
  page,
  pageSize,
  q,
  type,
  sort,
  order,
}: NetworkAddressParams) {
  const response = await api.get(`network-address`, {
    params: { page, pageSize, q, type, sort, order },
  });
  return networkAddressListSchema.parse(response.data);
}
