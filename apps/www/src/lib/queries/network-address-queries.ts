import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  getNetworkAddress,
  type NetworkAddressParams,
} from '@/features/network-address-data-table/lib/services/get-network-addresses';
import {
  getNetworkAddressByPublicId,
  type GetNetworkAddressByPublicIdParams,
} from '@/features/network-address-data-table/lib/services/get-one-network-address';

export const networkAddressQueries = createQueryKeys('networkAddress', {
  all: (params: NetworkAddressParams) => ({
    queryKey: [params],
    queryFn: () => getNetworkAddress(params),
  }),
  byPublicId: (params: GetNetworkAddressByPublicIdParams) => ({
    queryKey: [params],
    queryFn: () => getNetworkAddressByPublicId(params),
  }),
});
