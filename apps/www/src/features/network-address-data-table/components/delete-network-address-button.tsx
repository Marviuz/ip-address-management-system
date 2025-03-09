import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { type FC } from 'react';
import { toast } from 'sonner';
import { deleteNetworkAddresses } from '../lib/services/delete-network-addresses';
import { queries } from '@/lib/queries';
import { Button } from '@/components/common/button';

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
  const { data: user } = useSuspenseQuery(queries.users.me);
  const { mutate } = useMutation({
    mutationFn: deleteNetworkAddresses,
    onSuccess: async () => {
      await queryClient.refetchQueries(queries.networkAddress.all);
      const isPlural = publicIds.length > 1;
      const subject = isPlural ? 'network addresses' : 'network address';
      toast.info(`Deleted ${publicIds.length} ${subject} successfully`);
      onDelete();
    },
  });

  return user.role === 'super_admin' ? (
    <Button
      className="rounded-full"
      disabled={disabled}
      size={labled ? 'sm' : 'icon'}
      type="button"
      variant="destructive"
      onClick={() => mutate({ ids: publicIds })}
    >
      <Trash />
      {labled ? 'Delete Selected' : null}
    </Button>
  ) : null;
};
