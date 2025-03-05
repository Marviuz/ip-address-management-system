'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { type ChangeEvent, type FC } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/common/form';
import { Button } from '@/components/common/button';
import { Badge } from '@/components/common/badge';
import { type AddIPFormSchema, addIpFormSchema } from '../lib/schema';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import { NetworkAddressInputWrapper } from './network-address-input-wrapper';

const NETWORK_ADDRESS_VALID_VALUES_REGEX = /^[0-9a-fA-F:. -]*$/;

export const NetworkAddressForm: FC = () => {
  const form = useForm<AddIPFormSchema>({
    resolver: zodResolver(addIpFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      networkAddress: '',
    },
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const isValid = NETWORK_ADDRESS_VALID_VALUES_REGEX.test(value);

    if (isValid) form.setValue('networkAddress', value);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        // eslint-disable-next-line no-console -- temporarily log values
        onSubmit={form.handleSubmit(console.log)}
      >
        <FormField
          control={form.control}
          name="networkAddress"
          render={({ field }) => (
            <FormItem>
              <NetworkAddressInputWrapper>
                <FormControl>
                  <input
                    {...field}
                    className="min-w-0 grow outline-none"
                    onChange={handleInputChange}
                  />
                </FormControl>
                {getNetworkAddressType(field.value) ? (
                  <Badge>{getNetworkAddressType(field.value)}</Badge>
                ) : null}
              </NetworkAddressInputWrapper>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-auto" type="submit">
          <Plus />
          Add
        </Button>
      </form>
    </Form>
  );
};
