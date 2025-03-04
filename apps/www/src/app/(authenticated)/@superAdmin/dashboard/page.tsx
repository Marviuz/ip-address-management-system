import { z } from 'zod';
import { Button } from '@/components/common/button';
import { api } from '@/lib/api-client';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';

export default withAuth(async function SuperAdminDashboardPage() {
  const [meData, saData] = await Promise.all([
    api.private(
      (client) => client.get('users/me').json(),
      z.object({ id: z.number() }),
    ),

    api.private(
      (client) => client.get('users/me/super-admin').json(),
      z.unknown(),
    ),
  ]);

  return (
    <form>
      Dashboard
      <pre>{JSON.stringify(meData, null, 2)}</pre>
      <pre>{JSON.stringify(saData, null, 2)}</pre>
      <Button formAction={signOut}>Sign Out</Button>
    </form>
  );
});
