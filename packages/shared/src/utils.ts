import { z, type ZodSchema, type ZodTypeDef } from 'zod';
import { isIP } from 'validator';
import { type Role, type NetworkType } from './consts';
import { type UpdateNetworkAddressPayload } from './payloads';

export function createListSchema<TOut, TDef extends ZodTypeDef, TIn>(
  schema: ZodSchema<TOut, TDef, TIn>,
) {
  return z.object({
    items: schema.array(),
    pagination: z.object({
      currentPage: z.number(),
      pageSize: z.number(),
      totalPages: z.number(),
      totalItems: z.number(),
    }),
  });
}

export function snakeToNoCase(str: string) {
  return str.replace('_', ' ').trim();
}

type Network = 'IPv4' | 'IPv6';
type GetNetworkAddressTypeReturn = {
  readable: Network;
  value: NetworkType;
};

export function getNetworkAddressTypeSafe(
  value: string,
): GetNetworkAddressTypeReturn | null {
  if (isIP(value, '4')) {
    return { readable: 'IPv4', value: 'ipv4' };
  }

  if (isIP(value, '6')) {
    return { readable: 'IPv6', value: 'ipv6' };
  }

  return null;
}

export function getNetworkAddressType(value: string) {
  const data = getNetworkAddressTypeSafe(value);
  if (!data) throw new Error('Invalid Network Address');
  return data;
}

export function getReadableNetworkAddressType(netAddType: NetworkType) {
  switch (netAddType) {
    case 'ipv4':
      return 'IPv4';
    case 'ipv6':
      return 'IPv6';
  }
}

export function ensureRoleBasedNetAddrPayload(
  role: Role | null,
  data: UpdateNetworkAddressPayload,
) {
  if (!role) throw new Error('Role is required');

  if (role === 'regular' && 'comments' in data) delete data.comments;

  return data;
}
