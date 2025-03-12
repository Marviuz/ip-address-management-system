import { createFileRoute } from '@tanstack/react-router';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { SignUpCard } from '@/features/sign-up-card/components';

export const Route = createFileRoute('/_unauthenticated/register')({
  component: RegisterRoute,
});

function RegisterRoute() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpCard />
      </CardContent>
    </Card>
  );
}
