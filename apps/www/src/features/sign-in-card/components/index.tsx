import { type FC } from 'react';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/common/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { env } from '@/env';

export const SignInCard: FC = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <a href={`${env.VITE_BACKEND_URL}/auth/google`}>
            <SiGoogle />
            Sign in with Google
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};
