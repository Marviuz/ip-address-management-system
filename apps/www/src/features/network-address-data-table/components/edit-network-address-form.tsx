import { type FC } from 'react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useEditNetworkAddressMutation } from '../lib/services/edit-network-address';
import { NetworkAddressForm } from './network-address-form';
import { queries } from '@/lib/queries';

type EditNetworkAddressFormProps = {
  publicId: string;
};

export const EditNetworkAddressForm: FC<EditNetworkAddressFormProps> = ({
  publicId,
}) => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    queries.networkAddress.byPublicId({ publicId }),
  );
  const { mutate } = useEditNetworkAddressMutation();

  return (
    <NetworkAddressForm
      initialValues={{
        comments: data.comments,
        label: data.label,
        networkAddress: data.networkAddress,
      }}
      onSubmit={async (values) => {
        mutate({
          publicId,
          comments: values.comments,
          label: values.label,
          networkAddress: values.networkAddress,
        });
        await queryClient.invalidateQueries(queries.networkAddress.all);
      }}
    />
  );
};
