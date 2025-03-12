import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { refreshToken } from '@/lib/services/refresh-token';
import { ContinueWithOAuthCard } from '@/features/continue-with-oauth-card/components';

export const Route = createFileRoute('/_unauthenticated')({
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
  component: UnauthenticatedRoute,
});

function UnauthenticatedRoute() {
  return (
    <main className="grid min-h-svh place-items-center">
      <div className="w-full max-w-md">
        <div className="grid gap-8">
          <Outlet />
          <ContinueWithOAuthCard />
        </div>
      </div>
    </main>
  );
}
