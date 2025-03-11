import { type FC } from 'react';
import { useSearch } from '@tanstack/react-router';
import { networkAddressTableColumns } from './columns';
import { NetworksAddressDataTableToolbar } from './networks-address-data-table-toolbar';
import { DataTable } from '@/components/common/data-table';
import { networkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';
import { useTable } from '@/hooks/use-table';
import { useSuspenseAuthedUser } from '@/hooks/use-user-queries';
import { useNetworkAddresses } from '@/hooks/use-network-address-queries';

export const NetworkAddressDataTable: FC = () => {
  const { page, pageSize } = useSearch({ from: '/_authenticated/dashboard/' });
  const { data: userData } = useSuspenseAuthedUser();
  const { data: networkAddressesData } = useNetworkAddresses({
    page,
    pageSize,
  });

  const table = useTable({
    data: networkAddressApiTableAdapter(networkAddressesData.items),
    columns: networkAddressTableColumns,
    getRowId: (row) => row.addressId,
    state: {
      columnVisibility: {
        select: userData.role === 'super_admin',
      },
    },
  });

  const selectedIds = Object.keys(table.getState().rowSelection);

  return (
    <div className="grid gap-4">
      <DataTable table={table} />
      <NetworksAddressDataTableToolbar
        disabled={!selectedIds.length}
        publicIds={selectedIds}
        totalPages={networkAddressesData.pagination.totalPages}
        onDelete={() => table.resetRowSelection()}
      />
    </div>
  );
};
