import { type FC } from 'react';
import {
  DeleteNetworkAddressButton,
  type DeleteNetworkAddressButtonProps,
} from './delete-network-address-button';

type NetworksAddressDataTableToolbarProps = DeleteNetworkAddressButtonProps;

export const NetworksAddressDataTableToolbar: FC<
  NetworksAddressDataTableToolbarProps
> = ({ publicIds, disabled, labled = true, onDelete }) => {
  return (
    <div className="flex items-center justify-between">
      <DeleteNetworkAddressButton
        disabled={disabled}
        labled={labled}
        publicIds={publicIds}
        onDelete={onDelete}
      />
    </div>
  );
};
