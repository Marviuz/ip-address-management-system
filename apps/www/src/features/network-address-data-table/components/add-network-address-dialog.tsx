import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { useState, type FC } from 'react';
import { toast } from 'sonner';
import { useSearch } from '@tanstack/react-router';
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
  const [isOpen, setIsOpen] = useState(false);
  const { page, pageSize } = useSearch({ from: '/_authenticated/dashboard/' });
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: addNetworkAddress,
    onSuccess: async () => {
      await queryClient.refetchQueries(
        queries.networkAddress.all({ page, pageSize }),
      );
      toast.success('Network address added successfully');
      setIsOpen(false);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
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
          onSubmit={(values) =>
            mutateAsync({
              label: values.label,
              networkAddress: values.networkAddress,
              comments: values.comments,
            })
          }
        />
      </DialogContent>
    </Dialog>
  );
};
