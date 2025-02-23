import { GoogleOauthGuard } from './google-oauth.guard';

describe('googleOauthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleOauthGuard()).toBeDefined();
  });
});
