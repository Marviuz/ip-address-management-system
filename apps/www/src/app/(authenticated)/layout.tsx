import { Suspense } from 'react';
import { TokenRefresher } from '@/components/token-refresher';
import { withAuth } from '@/lib/with-auth';
import { type LayoutProps } from '@/utils/app-props';

export default withAuth<LayoutProps>(function AuthedLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TokenRefresher>{children}</TokenRefresher>
    </Suspense>
  );
});
