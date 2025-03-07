import { type ReactNode } from 'react';

export type PageProps<TParams = unknown, TSearchParams = unknown> = Readonly<{
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
}>;

export type LayoutProps<TParams = unknown, TSearchParams = unknown> = PageProps<
  TParams,
  TSearchParams
> &
  Readonly<{
    children: ReactNode;
  }>;
