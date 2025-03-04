import { Button } from '@/components/common/button';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';

export default withAuth(async function DashboardPage({ $auth }) {
  const meRes = await fetch('http://localhost:8000/users/me', {
    headers: {
      Authorization: `Bearer ${$auth.accessToken}`,
    },
  });
  const meData = await meRes.json();

  const saRes = await fetch('http://localhost:8000/users/me/super-admin', {
    headers: {
      Authorization: `Bearer ${$auth.accessToken}`,
    },
  });
  const saData = await saRes.json();

  const regRes = await fetch('http://localhost:8000/users/me/regular', {
    headers: {
      Authorization: `Bearer ${$auth.accessToken}`,
    },
  });
  const regData = await regRes.json();

  return (
    <form>
      Dashboard
      <pre>{JSON.stringify(meData, null, 2)}</pre>
      <pre>{JSON.stringify(saData, null, 2)}</pre>
      <pre>{JSON.stringify(regData, null, 2)}</pre>
      <Button formAction={signOut}>Sign Out</Button>
    </form>
  );
});
