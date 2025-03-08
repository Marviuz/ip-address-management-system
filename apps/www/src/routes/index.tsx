import { createFileRoute, redirect } from '@tanstack/react-router';
import { SignInCard } from '@/features/sign-in-card/components';

export const Route = createFileRoute('/')({
  component: Index,
  beforeLoad: ({ context }) => {
    if (context.auth?.accessToken) {
      return redirect({
        to: '/dashboard',
      });
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
