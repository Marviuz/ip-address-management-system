import { PASSWORD_REGEX, roles } from '@ip-address-management-system/shared';
import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
      ),
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
