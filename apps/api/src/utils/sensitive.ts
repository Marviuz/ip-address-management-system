import { getTableColumns } from 'drizzle-orm';
import { auditLogs, networkAddresses, users } from 'src/drizzle/schema';

export const {
  id: usersId,
  refreshToken,
  providerId,
  password,
  ...usersColumns
} = getTableColumns(users);

export const { id: networkAddressId, ...networkAddressColumns } =
  getTableColumns(networkAddresses);

export const {
  id: auditLogsId,
  userId,
  ...auditLogsColumns
} = getTableColumns(auditLogs);
