import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { type FC } from 'react';
import { toast } from 'sonner';
import { editNetworkAddress } from '../lib/services/edit-network-address';
import { NetworkAddressForm } from './network-address-form';
import { queries } from '@/lib/queries';
import { useSuspenseAuthedUser } from '@/hooks/use-user-queries';
import { useNetworkAddressByPublicId } from '@/hooks/use-network-address-queries';

type EditNetworkAddressFormProps = {
  publicId: string;
};

export const EditNetworkAddressForm: FC<EditNetworkAddressFormProps> = ({
  publicId,
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { page, pageSize } = useSearch({ from: '/_authenticated/dashboard/' });
  const { data: userData } = useSuspenseAuthedUser();
  const { data: networkAddressData } = useNetworkAddressByPublicId({
    publicId,
  });
  const { mutateAsync } = useMutation({
    mutationFn: editNetworkAddress,
    onSuccess: async () => {
      await queryClient.refetchQueries(
        queries.networkAddress.all({ page, pageSize }),
      );
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
        await mutateAsync({
          publicId,
          comments: values.comments,
          label: values.label,
          networkAddress: values.networkAddress,
        });
        await router.navigate({
          to: '/dashboard',
          search: (prev) => ({ ...prev, edit: undefined }),
        });
      }}
    />
  );
};
