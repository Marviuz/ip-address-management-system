import { redirect } from 'next/navigation';
import { getDashboardLink } from '@/components/links/dashboard-link';
import { SignInCard } from '@/features/sign-in-card/components';
import { getAuthSession } from '@/lib/auth';

export default async function SignInPage() {
  const { data: session } = await getAuthSession();

  if (session) {
    return redirect(getDashboardLink());
  }

  return (
    <main className="grid min-h-svh place-items-center">
      <SignInCard />
    </main>
  );
}
