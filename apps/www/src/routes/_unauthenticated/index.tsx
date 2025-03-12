import { createFileRoute } from '@tanstack/react-router';
import { ContinueWithOAuthCard } from '@/features/continue-with-oauth-card/components';

export const Route = createFileRoute('/_unauthenticated/')({
  component: Index,
});

function Index() {
  return <ContinueWithOAuthCard />;
}
