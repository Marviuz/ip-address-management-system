import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';
import { type SignInSchema, signInSchema } from '../lib/schemas/sign-in-schema';
import { loginUser } from '../lib/services/login-user';
import { Input } from '@/components/common/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Button } from '@/components/common/button';

export const SignInCard: FC = () => {
  const router = useRouter();
  const { mutate, isPending: isLoggingIn } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => router.invalidate(),
    onError: ({ message }) =>
      toast.error(
        message.includes('401') ? `Wrong email or password` : message,
      ),
  });
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutate(values);
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoggingIn} type="submit">
          {isLoggingIn ? 'Logging in' : 'Login'}
          {isLoggingIn ? <Loader2 className="animate-spin" /> : null}
        </Button>
      </form>
    </Form>
  );
};
