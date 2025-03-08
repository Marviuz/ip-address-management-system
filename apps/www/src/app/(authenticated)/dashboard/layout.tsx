import { getAuthedUser } from '@/lib/services/get-authed-user';
import { type LayoutProps } from '@/utils/app-props';

export default async function DashboardLayout({
  regular,
  superAdmin,
}: LayoutProps<unknown, 'regular' | 'superAdmin'>) {
  const user = await getAuthedUser();
  return user.role === 'regular' ? regular : superAdmin;
}
