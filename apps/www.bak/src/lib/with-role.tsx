import { type Role } from '@ip-address-management-system/shared';
import { type ComponentType } from 'react';
import { getAuthedUser } from './services/get-authed-user';

export function withRole<T extends object>(
  role: Role,
  Component: ComponentType<T>,
) {
  return async function RoleComponent(props: T) {
    const { role: userRole } = await getAuthedUser();

    if (userRole !== role) return null;

    return <Component {...props} />;
  };
}
