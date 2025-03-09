import { networkAddressSchema } from '@ip-address-management-system/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

type GetNetworkAddressByPublicIdParams = {
  publicId: string;
};

export async function getNetworkAddressByPublicId({
  publicId,
}: GetNetworkAddressByPublicIdParams) {
  const response = await api.get(`network-address/${publicId}`);
  return networkAddressSchema.parse(response.data);
}

export function useGetNetworkAddressByPublicIdQuery(
  params: GetNetworkAddressByPublicIdParams,
) {
  return useSuspenseQuery({
    queryKey: ['network-address', params],
    queryFn: () => getNetworkAddressByPublicId(params),
  });
}
