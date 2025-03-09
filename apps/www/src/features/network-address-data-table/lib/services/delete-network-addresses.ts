import { type DeleteNetworkAddressPayload } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export async function deleteNetworkAddresses(
  payload: DeleteNetworkAddressPayload,
) {
  await api.delete<unknown>('/network-address', {
    params: payload,
  });
}
