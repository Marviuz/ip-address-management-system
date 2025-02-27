import Link from 'next/link';
import { type ComponentProps, type FC } from 'react';

export function getDashboardLink() {
  return '/dashboard';
}

export const DashboardLink: FC<Omit<ComponentProps<typeof Link>, 'href'>> = ({
  ...props
}) => <Link href={getDashboardLink()} {...props} />;
