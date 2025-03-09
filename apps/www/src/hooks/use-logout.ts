import { useRouter } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth-context/use-auth';
import { logout } from '@/lib/services/logout';

export function useLogout() {
  const auth = useAuth();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      auth?.setAccessToken(null);
      await router.navigate({
        to: '/',
        replace: true,
      });
    },
  });

  return { logout: mutate };
}
