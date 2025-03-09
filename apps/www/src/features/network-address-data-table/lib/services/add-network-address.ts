import { type CreateNetworkAddressPayload } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export async function addNetworkAddress(payload: CreateNetworkAddressPayload) {
  const { data } = await api.post<unknown>('/network-address', payload);
  return data;
}
