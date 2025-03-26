import {
  ensureRoleBasedNetAddrPayload,
  type Role,
  type UpdateNetworkAddressPayload,
} from '@ip-address-management-system/shared';
import { api } from '@/lib/api-client';

type EditNetworkAddressParams = UpdateNetworkAddressPayload & {
  publicId: string;
  role: Role;
};

export async function editNetworkAddress({
  publicId,
  role,
  ...payload
}: EditNetworkAddressParams) {
  const filteredPayload = ensureRoleBasedNetAddrPayload(role, payload);

  const { data } = await api.put<unknown>(
    `/network-address/${publicId}`,
    filteredPayload,
  );
  return data;
}
