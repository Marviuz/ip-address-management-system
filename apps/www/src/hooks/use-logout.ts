import { useRouter } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/contexts/auth-context/use-auth';
import { logout } from '@/lib/services/sign-out';

export function useLogout() {
  const auth = useAuth();
  const { mutate } = useMutation({
    mutationFn: logout,
  });

  const router = useRouter();

  const logoutMutation = async () => {
    mutate();
    auth?.setAccessToken(null);
    await router.navigate({
      to: '/',
      replace: true,
    });
  };

  return { logout: logoutMutation };
}
