import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { type FC } from 'react';
import { toast } from 'sonner';
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
  const { data: userData } = useSuspenseQuery(queries.users.me);
  const { data: networkAddressData } = useSuspenseQuery({
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
      toast.success('Network address updated successfully');
    },
  });

  const isSuperAdmin = userData.role === 'super_admin';
  const isCreatorOfNetworkAddress =
    userData.publicId === networkAddressData.addedBy.publicId;

  const canEditNetworkAddress = isSuperAdmin || isCreatorOfNetworkAddress;

  return (
    <NetworkAddressForm
      canEditNetworkAddress={canEditNetworkAddress}
      initialValues={{
        comments: networkAddressData.comments,
        label: networkAddressData.label,
        networkAddress: networkAddressData.networkAddress,
      }}
      mode="edit"
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
