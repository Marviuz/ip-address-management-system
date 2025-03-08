import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  context: {
    auth: null,
  },
});

declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- module augmentation
  interface Register {
    router: typeof router;
  }
}
