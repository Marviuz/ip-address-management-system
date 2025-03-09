import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { type FC } from 'react';
import { addNetworkAddress } from '../lib/services/add-network-address';
import { NetworkAddressForm } from './network-address-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import { Button } from '@/components/common/button';
import { queries } from '@/lib/queries';

export const AddNetworkAddressDialog: FC = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addNetworkAddress,
    onSuccess: async () => {
      await queryClient.refetchQueries(queries.networkAddress.all);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto flex">
        <Button>
          <Plus />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add an new Network Address</DialogTitle>
          <DialogDescription>
            Enter the network address details.
          </DialogDescription>
        </DialogHeader>
        <NetworkAddressForm
          onSubmit={(values) => {
            mutate({
              label: values.label,
              networkAddress: values.networkAddress,
              comments: values.comments,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
