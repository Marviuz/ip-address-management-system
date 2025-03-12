import { roles } from '@ip-address-management-system/shared';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
    firstName: z.string().min(1, 'Given name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    role: z.enum(roles),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
