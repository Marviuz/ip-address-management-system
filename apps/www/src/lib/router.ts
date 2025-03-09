import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import { queryClient } from '@/contexts/query-context/core';

export const router = createRouter({
  routeTree,
  context: {
    auth: null,
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface Register {
    router: typeof router;
  }
}
