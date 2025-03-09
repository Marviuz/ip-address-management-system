import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { type FC } from 'react';
import { deleteNetworkAddresses } from '../lib/services/delete-network-addresses';
import { queries } from '@/lib/queries';
import { Button } from '@/components/common/button';

type DeleteNetworkAddressButtonProps = {
  publicId: string;
};

export const DeleteNetworkAddressButton: FC<
  DeleteNetworkAddressButtonProps
> = ({ publicId }) => {
  const queryClient = useQueryClient();
  const { data: user } = useSuspenseQuery(queries.users.me);
  const { mutate } = useMutation({
    mutationFn: deleteNetworkAddresses,
    onSuccess: async () => {
      await queryClient.refetchQueries(queries.networkAddress.all);
    },
  });

  return user.role === 'super_admin' ? (
    <Button
      className="rounded-full"
      size="icon"
      type="button"
      variant="destructive"
      onClick={() => mutate({ ids: [publicId] })}
    >
      <Trash />
    </Button>
  ) : null;
};
