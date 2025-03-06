import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { NetworkAddressService } from './network-address.service';
import { NetworkAddressController } from './network-address.controller';

@Module({
  imports: [DrizzleModule],
  controllers: [NetworkAddressController],
  providers: [NetworkAddressService],
})
export class NetworkAddressModule {}
