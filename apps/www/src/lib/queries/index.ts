import { mergeQueryKeys } from '@lukemorales/query-key-factory';
import { networkAddressQueries } from './network-address-queries';
import { userQueries } from './user-queries';

export const queries = mergeQueryKeys(userQueries, networkAddressQueries);
