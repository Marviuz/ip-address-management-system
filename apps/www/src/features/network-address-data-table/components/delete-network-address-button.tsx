import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { type FC } from 'react';
import { toast } from 'sonner';
import { useSearch } from '@tanstack/react-router';
import { deleteNetworkAddresses } from '../lib/services/delete-network-addresses';
import { DeleteNetworkAddressAlertDialog } from './delete-network-address-alert-dialog';
import { queries } from '@/lib/queries';
import { Button } from '@/components/common/button';
import { useSuspenseAuthedUser } from '@/hooks/use-user-queries';

export type DeleteNetworkAddressButtonProps = {
  publicIds: string[];
  disabled?: boolean;
  labled?: boolean;
  onDelete: () => void;
};

export const DeleteNetworkAddressButton: FC<
  DeleteNetworkAddressButtonProps
> = ({ publicIds, disabled, labled, onDelete }) => {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseAuthedUser();
  const { page, pageSize } = useSearch({ from: '/_authenticated/dashboard/' });

  const isPlural = publicIds.length > 1;

  const { mutate } = useMutation({
    mutationFn: deleteNetworkAddresses,
    onSuccess: async () => {
      await queryClient.refetchQueries(
        queries.networkAddress.all({ page, pageSize }),
      );
      const subject = isPlural ? 'network addresses' : 'network address';
      toast.info(`Deleted ${publicIds.length} ${subject} successfully`);
      onDelete();
    },
  });

  return user.role === 'super_admin' ? (
    <DeleteNetworkAddressAlertDialog
      isPlural={isPlural}
      onContinue={() => mutate({ ids: publicIds })}
    >
      <Button
        className={!labled ? 'rounded-full' : undefined}
        disabled={disabled}
        size={labled ? 'sm' : 'icon'}
        type="button"
        variant="destructive"
      >
        <Trash />
        {labled ? 'Delete Selected' : null}
      </Button>
    </DeleteNetworkAddressAlertDialog>
  ) : null;
};
