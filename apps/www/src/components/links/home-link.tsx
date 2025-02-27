import Link from 'next/link';
import { type ComponentProps, type FC } from 'react';

export function getHomeLink() {
  return '/';
}

export const HomeLink: FC<Omit<ComponentProps<typeof Link>, 'href'>> = ({
  ...props
}) => <Link href={getHomeLink()} {...props} />;
