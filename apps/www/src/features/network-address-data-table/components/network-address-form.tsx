import { zodResolver } from '@hookform/resolvers/zod';
import { type ChangeEvent, type FC } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  type NetworkAddressFormSchema,
  networkAddressFormSchema,
} from '../lib/schema';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import { type CreateFeatureFlags } from '../utils/create-feature-flags-type';
import { NetworkAddressInputWrapper } from './network-address-input-wrapper';
import { NetworkAddressFormSubmitButtonLabel } from './network-address-form-submit-button';
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

const NETWORK_ADDRESS_VALID_VALUES_REGEX = /^[0-9a-fA-F:. -]*$/;

type NetworkAddressFormProps = Partial<
  CreateFeatureFlags<'create' | 'edit', NetworkAddressFormSchema>
> & {
  mode?: 'create' | 'edit';
  initialValues?: NetworkAddressFormSchema;
  onSubmit: SubmitHandler<NetworkAddressFormSchema>;
};

export const NetworkAddressForm: FC<NetworkAddressFormProps> = ({
  mode = 'create',
  canEditLabel = true,
  canCreateLabel = true,
  canEditComments = true,
  canCreateComments = true,
  canEditNetworkAddress = true,
  canCreateNetworkAddress = true,
  initialValues,
  onSubmit,
}) => {
  const form = useForm<NetworkAddressFormSchema>({
    resolver: zodResolver(networkAddressFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: initialValues ?? {
      networkAddress: '',
      label: '',
      comments: '',
    },
  });

  const { isSubmitting } = form.formState;

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    const isValid = NETWORK_ADDRESS_VALID_VALUES_REGEX.test(value);

    if (isValid) form.setValue('networkAddress', value);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          disabled={
            !canEditNetworkAddress ||
            (mode === 'create' && !canCreateNetworkAddress)
          }
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
          disabled={!canEditLabel || (mode === 'create' && !canCreateLabel)}
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
          disabled={
            !canEditComments || (mode === 'create' && !canCreateComments)
          }
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

        <Button className="ml-auto" disabled={isSubmitting} type="submit">
          <NetworkAddressFormSubmitButtonLabel
            isLoading={isSubmitting}
            mode={mode}
          />
        </Button>
      </form>
    </Form>
  );
};
