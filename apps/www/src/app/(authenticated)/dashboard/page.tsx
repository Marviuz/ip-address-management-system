import { Button } from '@/components/common/button';
import { getAuthSession, signOut } from '@/lib/auth';

export default async function DashboardPage() {
  const { data: session } = await getAuthSession();
  const meRes = await fetch('http://localhost:8000/users/me', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const meData = await meRes.json();

  const saRes = await fetch('http://localhost:8000/users/me/super-admin', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const saData = await saRes.json();

  const regRes = await fetch('http://localhost:8000/users/me/regular', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
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
}
