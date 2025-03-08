import { useRouter } from '@tanstack/react-router';
import { useAuth } from '@/contexts/auth-context/use-auth';
import { useLogoutMutation } from '@/lib/services/sign-out';

export function useLogout() {
  const auth = useAuth();
  const { mutate } = useLogoutMutation();
  const router = useRouter();

  const logout = async () => {
    auth?.setAccessToken(null);
    mutate();
    await router.navigate({
      to: '/',
      replace: true,
    });
  };

  return { logout };
}
