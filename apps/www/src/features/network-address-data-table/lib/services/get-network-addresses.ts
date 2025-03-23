import {
  type GetNetworkAddressesListPayload,
  networkAddressListSchema,
} from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';
import { type PaginationSchema } from '@/lib/schemas/pagination';

export type NetworkAddressParams = PaginationSchema &
  GetNetworkAddressesListPayload;

export async function getNetworkAddress({
  page,
  pageSize,
  q,
}: NetworkAddressParams) {
  const { data } = await api.get<unknown>(`network-address`, {
    params: { page, pageSize, q },
  });
  return networkAddressListSchema.parse(data);
}
