import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { type FC } from 'react';
import { editNetworkAddress } from '../lib/services/edit-network-address';
import { NetworkAddressForm } from './network-address-form';
import { queries } from '@/lib/queries';

type EditNetworkAddressFormProps = {
  publicId: string;
};

export const EditNetworkAddressForm: FC<EditNetworkAddressFormProps> = ({
  publicId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useSuspenseQuery({
    ...queries.networkAddress.byPublicId({ publicId }),
    staleTime: 0,
  });
  const { mutate } = useMutation({
    mutationFn: editNetworkAddress,
    onSuccess: async () => {
      await queryClient.refetchQueries(queries.networkAddress.all);
      await queryClient.refetchQueries(
        queries.networkAddress.byPublicId({ publicId }),
      );
    },
  });

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
        await router.navigate({
          to: '/dashboard',
          search: { edit: undefined },
        });
      }}
    />
  );
};
