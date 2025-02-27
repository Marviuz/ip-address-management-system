import { Button } from '@/components/common/button';
import { getAuthSession, signOut } from '@/lib/auth';

export default async function DashboardPage() {
  const { data: session } = await getAuthSession();
  const response = await fetch('http://localhost:8000/users/me', {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const data = await response.json();

  return (
    <form>
      Dashboard
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button formAction={signOut}>Sign Out</Button>
    </form>
  );
}
