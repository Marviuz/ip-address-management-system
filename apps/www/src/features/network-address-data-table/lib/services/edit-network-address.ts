import { type UpdateNetworkAddressPayload } from '@ip-address-management-system/shared';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

type EditNetworkAddressParams = UpdateNetworkAddressPayload & {
  publicId: string;
};

export async function editNetworkAddress({
  publicId,
  ...payload
}: EditNetworkAddressParams) {
  const { data } = await api.put<unknown>(
    `/network-address/${publicId}`,
    payload,
  );
  return data;
}

export function useEditNetworkAddressMutation() {
  return useMutation({
    mutationFn: editNetworkAddress,
  });
}
