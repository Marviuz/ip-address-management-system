import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { networkAddresses } from 'src/drizzle/schema';
import { DrizzleDatabase } from 'src/drizzle/types/drizzle';
import { InsertNetworkAddressSchema } from 'src/types/network-address';

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

  findAll() {
    return `This action returns all networkAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} networkAddress`;
  }
}
