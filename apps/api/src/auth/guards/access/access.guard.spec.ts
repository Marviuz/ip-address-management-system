import { Reflector } from '@nestjs/core';
import { AccessGuard } from './access.guard';

describe('accessGuard', () => {
  it('should be defined', () => {
    const reflector = new Reflector();

    expect(new AccessGuard(reflector)).toBeDefined();
  });
});
