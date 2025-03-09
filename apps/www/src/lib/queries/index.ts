import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { networkAddressQueries } from './network-address-queries';

export const queries = mergeQueryKeys(networkAddressQueries);
