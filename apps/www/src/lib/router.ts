import { createRouter } from '@tanstack/react-router';
import nProgress from 'nprogress';
import { routeTree } from '@/routeTree.gen';
import { queryClient } from '@/contexts/query-context/core';

export const router = createRouter({
  routeTree,
  context: {
    auth: null,
    queryClient,
  },
});

nProgress.configure({ showSpinner: false });
router.subscribe('onBeforeLoad', () => nProgress.start());
router.subscribe('onResolved', () => nProgress.done());

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface Register {
    router: typeof router;
  }
}
