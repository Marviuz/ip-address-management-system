import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';
import { type SignUpSchema, signUpSchema } from '../lib/schemas/sign-up-schema';
import { createAccount } from '../lib/services/create-account';
import { Input } from '@/components/common/input';
import { RadioGroup, RadioGroupItem } from '@/components/common/radio-group';
import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Route as signInRoute } from '@/routes/_unauthenticated';

export const SignUpCard: FC = () => {
  const { mutate } = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => toast.success(data.message),
    onError: ({ message }, { email }) =>
      toast.error(
        message.includes('409') ? `Email ${email} already exists` : message,
      ),
  });
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      role: 'regular',
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    mutate(values);
  });

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Register as:</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex space-x-1"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="regular" />
                    </FormControl>
                    <FormLabel className="font-normal">Regular</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="super_admin" />
                    </FormControl>
                    <FormLabel className="font-normal">Super Admin</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
        <Button asChild variant="link">
          <Link to={signInRoute.to}>Login</Link>
        </Button>
      </form>
    </Form>
  );
};
