import { GoogleAuthGuard } from './google-auth.guard';

describe('googleAuthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleAuthGuard()).toBeDefined();
  });
});
