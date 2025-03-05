'use client';

import { Plus } from 'lucide-react';
import { type ChangeEvent, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/common/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/common/form';
import { Input } from '@/components/common/input';
import { type AddIPFormSchema, addIpFormSchema } from '../lib/schema';

const NETWORK_ADDRESS_VALID_VALUES_REGEX = /^[0-9a-fA-F:. -]*$/;

export const AddIpForm: FC = () => {
  const form = useForm<AddIPFormSchema>({
    resolver: zodResolver(addIpFormSchema),
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
              <FormControl>
                <Input {...field} onChange={handleInputChange} />
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
