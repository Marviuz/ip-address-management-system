import { createFileRoute, Link } from '@tanstack/react-router';
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
        <p className="text-muted-foreground mt-8 text-center text-sm">
          Don&apos;t have an account yet?{' '}
          <Link
            className="text-foreground font-semibold underline"
            to="/register"
          >
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
