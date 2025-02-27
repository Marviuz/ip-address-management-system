import { Button } from '@/components/common/button';
import { signOut } from '@/lib/auth';

export default function DashboardPage() {
  return (
    <form>
      Dashboard
      <Button formAction={signOut}>Sign Out</Button>
    </form>
  );
}
