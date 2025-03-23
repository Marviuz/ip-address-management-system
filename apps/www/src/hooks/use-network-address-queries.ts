import { useSuspenseQuery } from '@tanstack/react-query';
import { type NetworkAddressParams } from '@/features/network-address-data-table/lib/services/get-network-addresses';
import { queries } from '@/lib/queries';
import { type GetNetworkAddressByPublicIdParams } from '@/features/network-address-data-table/lib/services/get-one-network-address';

export function useSuspenseNetworkAddresses(params: NetworkAddressParams) {
  return useSuspenseQuery({
    ...queries.networkAddress.all(params),
    staleTime: 0,
  });
}

export function useNetworkAddresses(params: NetworkAddressParams) {
  return useSuspenseQuery({
    ...queries.networkAddress.all(params),
    staleTime: 0,
  });
}

export function useNetworkAddressByPublicId(
  params: GetNetworkAddressByPublicIdParams,
) {
  return useSuspenseQuery({
    ...queries.networkAddress.byPublicId(params),
    staleTime: 0,
  });
}
