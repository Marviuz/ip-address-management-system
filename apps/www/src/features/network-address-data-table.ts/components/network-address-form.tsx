'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { type ChangeEvent, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { Textarea } from '@/components/common/textarea';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import {
  type NetworkAddressFormSchema,
  networkAddressFormSchema,
} from '../lib/schema';
import { addNetworkAddress } from '../lib/services/add-network-address';
import { NetworkAddressInputWrapper } from './network-address-input-wrapper';

const NETWORK_ADDRESS_VALID_VALUES_REGEX = /^[0-9a-fA-F:. -]*$/;

export const NetworkAddressForm: FC = () => {
  const form = useForm<NetworkAddressFormSchema>({
    resolver: zodResolver(networkAddressFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      networkAddress: '',
      label: '',
      comments: '',
    },
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const isValid = NETWORK_ADDRESS_VALID_VALUES_REGEX.test(value);

    if (isValid) form.setValue('networkAddress', value);
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await addNetworkAddress(data);
    // eslint-disable-next-line no-console -- temporarily log values
    console.log(response);
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="networkAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network Address</FormLabel>
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
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
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
