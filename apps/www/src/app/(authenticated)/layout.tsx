import { redirect } from 'next/navigation';
import { getHomeLink } from '@/components/links/home-link';
import { getAuthSession } from '@/lib/auth';

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session } = await getAuthSession();

  if (!session) {
    return redirect(getHomeLink());
  }

  return children;
}
