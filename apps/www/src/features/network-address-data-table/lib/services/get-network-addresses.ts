import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export async function getNetworkAddress() {
  const { data } = await api.get<unknown>(`network-address`);
  return networkAddressListSchema.parse(data);
}
