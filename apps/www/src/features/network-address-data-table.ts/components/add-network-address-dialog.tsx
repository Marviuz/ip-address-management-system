import { type PropsWithChildren, type FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { NetworkAddressForm } from './network-address-form';

export const AddNetworkAddressDialog: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an new Network Address</DialogTitle>
          <DialogDescription>
            Enter the network address details.
          </DialogDescription>
        </DialogHeader>
        <NetworkAddressForm />
      </DialogContent>
    </Dialog>
  );
};
