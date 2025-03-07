import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { Inject, Injectable } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { networkAddresses, users } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { InsertNetworkAddressSchema } from 'src/types/network-address';
import { networkAddressColumns, usersColumns } from 'src/utils/sensitive';
import { withPagination } from 'src/utils/with-pagination';

@Injectable()
export class NetworkAddressService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDatabase) {}

  async create(payload: InsertNetworkAddressSchema) {
    const [networkAddress] = await this.db
      .insert(networkAddresses)
      .values(payload)
      .returning();

    return networkAddress;
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

  findOne(publicId: string) {
    const query = this.db.query.networkAddresses.findFirst({
      where: eq(networkAddresses.publicId, publicId),
    });

    return query;
  }
}
