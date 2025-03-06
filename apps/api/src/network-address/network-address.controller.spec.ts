import { Test, type TestingModule } from '@nestjs/testing';
import { NetworkAddressController } from './network-address.controller';
import { NetworkAddressService } from './network-address.service';

describe('networkAddressController', () => {
  let controller: NetworkAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NetworkAddressController],
      providers: [NetworkAddressService],
    }).compile();

    controller = module.get<NetworkAddressController>(NetworkAddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
