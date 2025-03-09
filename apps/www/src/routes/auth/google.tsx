import { createFileRoute, redirect } from '@tanstack/react-router';
import { tokenSchema } from '@ip-address-management-system/shared';
import { zodValidator } from '@tanstack/zod-adapter';

export const Route = createFileRoute('/auth/google')({
  validateSearch: zodValidator(tokenSchema),
  beforeLoad: ({ search, context }) => {
    context.auth?.setAccessToken(search.access_token);

    return redirect({
      to: '/dashboard',
    });
  },
});
