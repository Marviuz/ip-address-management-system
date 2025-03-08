import { type FC } from 'react';
import { useGetNetworkAddressByPublicIdQuery } from '../lib/services/get-one-network-address';
import { NetworkAddressForm } from './network-address-form';

type EditNetworkAddressFormProps = {
  publicId: string;
};

export const EditNetworkAddressForm: FC<EditNetworkAddressFormProps> = ({
  publicId,
}) => {
  const { data } = useGetNetworkAddressByPublicIdQuery({ publicId });

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
