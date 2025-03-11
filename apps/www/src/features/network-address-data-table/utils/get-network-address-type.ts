import { isIP } from 'validator';

export function getNetworkAddressType(value: string) {
  if (isIP(value, '4')) return 'IPv4';
  if (isIP(value, '6')) return 'IPv6';
  return null;
}
