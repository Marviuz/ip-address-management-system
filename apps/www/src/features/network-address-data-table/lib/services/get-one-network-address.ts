import { networkAddressSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export type GetNetworkAddressByPublicIdParams = {
  publicId: string;
};

export async function getNetworkAddressByPublicId({
  publicId,
}: GetNetworkAddressByPublicIdParams) {
  const response = await api.get(`network-address/${publicId}`);
  return networkAddressSchema.parse(response.data);
}
