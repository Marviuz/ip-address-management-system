import { type ReactNode } from 'react';
import { type Role } from '@ip-address-management-system/shared';
import { TokenRefresher } from '@/components/token-refresher';
import { type LayoutProps } from '@/utils/app-props';
import { withAuth } from '@/lib/with-auth';

type DashboardLayoutProps = LayoutProps &
  Readonly<{
    regular: ReactNode;
    superAdmin: ReactNode;
  }>;

export default withAuth<DashboardLayoutProps>(
  async function AuthenticatedLayout({ superAdmin, regular, $auth }) {
    const response = await fetch('http://localhost:8000/users/me', {
      headers: {
        Authorization: `Bearer ${$auth.accessToken}`,
      },
    });
    const user = (await response.json()) as { role: Role };

    switch (user.role) {
      case 'super_admin':
        return <TokenRefresher>{superAdmin}</TokenRefresher>;
      case 'regular':
        return <TokenRefresher>{regular}</TokenRefresher>;
      default:
        return (
          <TokenRefresher>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </TokenRefresher>
        );
    }
  },
);
