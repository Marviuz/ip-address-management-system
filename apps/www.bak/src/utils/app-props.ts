import { type ReactNode } from 'react';

export type PageProps<TParams = unknown, TSearchParams = unknown> = Readonly<{
  params: Promise<TParams>;
  searchParams: Promise<TSearchParams>;
}>;

export type LayoutProps<
  TParams = unknown,
  TComponent extends string = 'children',
> = Readonly<{
  params: Promise<TParams>;
}> &
  Record<TComponent, ReactNode>;
