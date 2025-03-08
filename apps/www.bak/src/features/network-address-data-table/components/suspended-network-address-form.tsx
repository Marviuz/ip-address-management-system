import { type FC } from 'react';
import { getNetworkAddressByPublicId } from '../lib/services/get-one-network-address';
import { NetworkAddressForm } from './network-address-form';

export const SuspendedNetworkAddressForm: FC<{ publicId: string }> = async ({
  publicId,
}) => {
  const data = await getNetworkAddressByPublicId(publicId);

  return (
    <NetworkAddressForm
      initialValues={{
        comments: data.comments,
        label: data.label,
        networkAddress: data.networkAddress,
      }}
    />
  );
};
