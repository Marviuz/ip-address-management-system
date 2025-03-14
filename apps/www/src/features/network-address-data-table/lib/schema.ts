import { z } from 'zod';
import isIP from 'validator/es/lib/isIP';

export const networkAddressFormSchema = z.object({
  networkAddress: z
    .string()
    .refine((value) => isIP(value), 'Invalid Network Address'),
  label: z.string().min(1, 'This field is required'),
  comments: z.string(),
});

export type NetworkAddressFormSchema = z.infer<typeof networkAddressFormSchema>;
