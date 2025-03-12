import { createFileRoute } from '@tanstack/react-router';
import { SignInCard } from '@/features/sign-in-card/components';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';

export const Route = createFileRoute('/_unauthenticated/')({
  component: Index,
});

function Index() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <SignInCard />
      </CardContent>
    </Card>
  );
}
