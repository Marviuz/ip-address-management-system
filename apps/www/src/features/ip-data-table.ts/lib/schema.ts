import { z } from 'zod';
import isIP from 'validator/es/lib/isIP';
import isMACAddress from 'validator/es/lib/isMACAddress';

export const addIpFormSchema = z.object({
  networkAddress: z
    .string()
    .refine(
      (value) => isIP(value) || isMACAddress(value),
      'Invalid Network Address',
    ),
});

export type AddIPFormSchema = z.infer<typeof addIpFormSchema>;
