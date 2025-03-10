import {
  DeleteNetworkAddressPayload,
  networkAddressListSchema,
  UpdateNetworkAddressPayload,
} from '@ip-address-management-system/shared';
import { Inject, Injectable } from '@nestjs/common';
import { asc, eq, inArray } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { auditLogs, networkAddresses, users } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { InsertNetworkAddressSchema } from 'src/types/network-address';
import { networkAddressColumns, usersColumns } from 'src/utils/sensitive';
import { withPagination } from 'src/utils/with-pagination';

@Injectable()
export class NetworkAddressService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async create(
    payload: InsertNetworkAddressSchema,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const $networkAddress = await this.db.transaction(async (tx) => {
      try {
        const [networkAddress] = await tx
          .insert(networkAddresses)
          .values(payload)
          .returning();

        if (!networkAddress)
          throw new Error('Failed to create network address');

        await tx.insert(auditLogs).values({
          action: 'create',
          entity: 'network_address',
          entityId: networkAddress.id,
          userId: networkAddress.addedBy,
          metadata: {},
          userAgent,
          ipAddress,
          changes: {},
        });

        return networkAddress;
      } catch (e) {
        // eslint-disable-next-line no-console -- log errors
        console.log(e);
        tx.rollback();
      }
    });

    return $networkAddress;
  }

  async findAll(page = 1, pageSize = 10) {
    const query = this.db
      .select({ ...networkAddressColumns, addedBy: usersColumns })
      .from(networkAddresses)
      .leftJoin(users, eq(networkAddresses.addedBy, users.id));

    const totalItems = await this.db.$count(networkAddresses);

    const data = await withPagination(
      query.$dynamic(),
      asc(networkAddresses.id),
      page,
      pageSize,
      totalItems,
    );

    return networkAddressListSchema.parse(data);
  }

  async findOne(publicId: string) {
    const [networkAddress] = await this.db
      .select({ ...networkAddressColumns, addedBy: usersColumns })
      .from(networkAddresses)
      .leftJoin(users, eq(networkAddresses.addedBy, users.id))
      .where(eq(networkAddresses.publicId, publicId));

    return networkAddress;
  }

  async update(
    publicId: string,
    payload: UpdateNetworkAddressPayload,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const $networkAddress = await this.db.transaction(async (tx) => {
      try {
        const [networkAddress] = await this.db
          .update(networkAddresses)
          .set(payload)
          .where(eq(networkAddresses.publicId, publicId))
          .returning();

        if (!networkAddress)
          throw new Error('Failed to update network address');

        await tx.insert(auditLogs).values({
          action: 'update',
          entity: 'network_address',
          entityId: networkAddress.id,
          userId: networkAddress.addedBy,
          metadata: {},
          userAgent,
          ipAddress,
          changes: {},
        });

        return networkAddress;
      } catch (e) {
        // eslint-disable-next-line no-console -- log errors
        console.log(e);
        tx.rollback();
      }
    });

    return $networkAddress;
  }

  async batchRemove(
    { ids }: DeleteNetworkAddressPayload,
    ipAddress: string | null,
    userAgent: string | null,
  ) {
    const $deleted = await this.db.transaction(async (tx) => {
      try {
        const deleted = await tx
          .delete(networkAddresses)
          .where(inArray(networkAddresses.publicId, ids))
          .returning();

        if (!deleted.length)
          throw new Error('Failed to delete network address');

        const values = deleted.map((del) => ({
          action: 'delete' as const,
          entity: 'network_address' as const,
          entityId: del.id,
          userId: del.addedBy,
          metadata: {},
          userAgent,
          ipAddress,
          changes: {},
        }));

        await tx.insert(auditLogs).values(values);

        return deleted;
      } catch (e) {
        // eslint-disable-next-line no-console -- log errors
        console.log(e);
        tx.rollback();
      }
    });

    return $deleted;
  }
}
