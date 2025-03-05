import { type PropsWithChildren, type FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { AddIpForm } from './add-ip-form';

export const AddIpDialog: FC<PropsWithChildren> = ({ children }) => {
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
        <AddIpForm />
      </DialogContent>
    </Dialog>
  );
};
