import { TokenRefresher } from '@/components/token-refresher';
import { type LayoutProps } from '@/utils/app-props';

export default function AuthenticatedLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <TokenRefresher />
    </>
  );
}
