import Link from 'next/link';
import { type ComponentProps, type FC } from 'react';
import { env } from '@/env';

export function getGoogleSignInLink() {
  return `${env.BACKEND_URL}/auth/google`;
}

export const GoogleSignInLink: FC<
  Omit<ComponentProps<typeof Link>, 'href'>
> = ({ ...props }) => <Link href={getGoogleSignInLink()} {...props} />;
