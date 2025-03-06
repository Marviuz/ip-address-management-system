'use server';

import { type CreateNetworkAddressPayload } from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

export async function addNetworkAddress(payload: CreateNetworkAddressPayload) {
  const response = await api.private((client) =>
    client.post('network-address', { json: payload }).json(),
  );

  return response;
}
