'use server';

import { networkAddressSchema } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export async function getNetworkAddressByPublicId(publicId: string) {
  const data = await api.private(
    (client) => client.get(`network-address/${publicId}`).json(),
    networkAddressSchema,
  );

  return data;
}
