import { LocalAuthGuard } from './local-auth.guard';

describe('localAuthGuard', () => {
  it('should be defined', () => {
    expect(new LocalAuthGuard()).toBeDefined();
  });
});
