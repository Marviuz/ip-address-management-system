import { z } from 'zod';
import isMACAddress from 'validator/es/lib/isMACAddress';

export const addIpFormSchema = z.object({
  networkAddress: z.union(
    [
      z.string().ip({
        message: 'Invalid network address',
      }),
      z.string().refine(isMACAddress),
    ],
    {
      message: 'Invalid network address',
    },
  ),
});

export type AddIPFormSchema = z.infer<typeof addIpFormSchema>;
