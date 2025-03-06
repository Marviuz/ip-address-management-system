import { getTableColumns } from 'drizzle-orm';
import { networkAddresses, users } from 'src/drizzle/schema';

export const {
  id: usersId,
  refreshToken,
  providerId,
  ...usersColumns
} = getTableColumns(users);

export const { id: networkAddressId, ...networkAddressColumns } =
  getTableColumns(networkAddresses);
