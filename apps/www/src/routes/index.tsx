import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignInCard } from '@/features/sign-in-card/components';
import { refreshToken } from '@/lib/services/refresh-token';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: async ({ context }) => {
    if (!context.auth?.accessToken) {
      const newTokens = await refreshToken();
      if (newTokens.success) {
        context.auth?.setAccessToken(newTokens.data.access_token);
        return redirect({
          to: '/dashboard',
        });
      }
    }
  },
});

function Index() {
  return (
    <main className="grid min-h-svh place-items-center">
      <SignInCard />
    </main>
  );
}
