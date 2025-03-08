import { type FC } from 'react';
import { SiGoogle } from '@icons-pack/react-simple-icons';
import { Button } from '@/components/common/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/common/card';
import { GoogleSignInLink } from '@/components/links/google-sign-in-link';

export const SignInCard: FC = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <GoogleSignInLink>
            <SiGoogle />
            Sign in with Google
          </GoogleSignInLink>
        </Button>
      </CardContent>
    </Card>
  );
};
