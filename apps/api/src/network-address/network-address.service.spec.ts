import { Test, type TestingModule } from '@nestjs/testing';
import { NetworkAddressService } from './network-address.service';

describe('networkAddressService', () => {
  let service: NetworkAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NetworkAddressService],
    }).compile();

    service = module.get<NetworkAddressService>(NetworkAddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
