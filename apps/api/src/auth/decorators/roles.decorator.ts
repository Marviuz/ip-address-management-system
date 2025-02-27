import { SetMetadata } from '@nestjs/common';
import { type Role } from 'src/types/user';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles);
