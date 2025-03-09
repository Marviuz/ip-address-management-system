import { type FC } from 'react';
import { useSearch, useRouter } from '@tanstack/react-router';
import {
  DeleteNetworkAddressButton,
  type DeleteNetworkAddressButtonProps,
} from './delete-network-address-button';
import { AddNetworkAddressDialog } from './add-network-address-dialog';
import {
  RouteBasedPagination,
  type RouteBasedPaginationProps,
} from '@/components/common/route-based-pagination';
import { Input } from '@/components/common/input';

type NetworksAddressDataTableToolbarProps = DeleteNetworkAddressButtonProps &
  Pick<RouteBasedPaginationProps, 'totalPages'>;

export const NetworksAddressDataTableToolbar: FC<
  NetworksAddressDataTableToolbarProps
> = ({ publicIds, disabled, labled = true, onDelete, totalPages }) => {
  const router = useRouter();
  const search = useSearch({
    from: '/_authenticated/dashboard/',
  });

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
      <div className="flex gap-4">
        <Input
          className="w-9 shrink-0 px-0 text-center"
          defaultValue={search.pageSize}
          type="text"
          onKeyDown={async (e) => {
            if (e.key === 'Enter') {
              const pageSize = parseInt(e.currentTarget.value);
              e.preventDefault();
              await router.navigate({
                to: '/dashboard',
                search: (prev) => ({ ...prev, pageSize }),
              });
            }
          }}
        />
        <RouteBasedPagination
          currentPage={search.page}
          to="/dashboard"
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};
