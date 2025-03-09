import { type FC } from 'react';
import {
  DeleteNetworkAddressButton,
  type DeleteNetworkAddressButtonProps,
} from './delete-network-address-button';
import { AddNetworkAddressDialog } from './add-network-address-dialog';

type NetworksAddressDataTableToolbarProps = DeleteNetworkAddressButtonProps;

export const NetworksAddressDataTableToolbar: FC<
  NetworksAddressDataTableToolbarProps
> = ({ publicIds, disabled, labled = true, onDelete }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <AddNetworkAddressDialog />
        <DeleteNetworkAddressButton
          disabled={disabled}
          labled={labled}
          publicIds={publicIds}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
};
