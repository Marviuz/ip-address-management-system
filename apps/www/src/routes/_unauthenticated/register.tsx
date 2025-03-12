import { createFileRoute, Link } from '@tanstack/react-router';
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
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Already have an account?{' '}
          <Link className="text-foreground font-semibold underline" to="/">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
