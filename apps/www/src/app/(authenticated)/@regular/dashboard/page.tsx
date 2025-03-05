import { z } from 'zod';
import { Button } from '@/components/common/button';
import { api } from '@/lib/api-client';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';
import { IpDataTable } from '@/features/ip-data-table.ts/components';

export default withAuth(async function RegularDashboardPage() {
  const [meData, regData] = await Promise.all([
    api.private(
      (client) => client.get('users/me').json(),
      z.object({ id: z.number() }),
    ),
    api.private((client) => client.get('users/me/regular').json(), z.unknown()),
  ]);

  return (
    <form>
      Dashboard
      <pre>{JSON.stringify(meData, null, 2)}</pre>
      <pre>{JSON.stringify(regData, null, 2)}</pre>
      <IpDataTable />
      <Button formAction={signOut}>Sign Out</Button>
    </form>
  );
});
