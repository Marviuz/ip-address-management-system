import { type CreateNetworkAddressPayload } from '@ip-address-management-system/shared';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export async function addNetworkAddress(payload: CreateNetworkAddressPayload) {
  const { data } = await api.post<unknown>('/network-address', payload);
  return data;
}

export function useAddNetworkAddressMutation() {
  return useMutation({
    mutationFn: addNetworkAddress,
  });
}
