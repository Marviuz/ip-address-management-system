import { type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { networkAddressTableColumns } from './columns';
import { NetworksAddressDataTableToolbar } from './networks-address-data-table-toolbar';
import { DataTable } from '@/components/common/data-table';
import { networkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';
import { queries } from '@/lib/queries';
import { useTable } from '@/hooks/use-table';

export const NetworkAddressDataTable: FC = () => {
  const { data: userData } = useSuspenseQuery(queries.users.me);
  const { data } = useSuspenseQuery({
    ...queries.networkAddress.all,
    staleTime: 0,
  });

  const table = useTable({
    data: networkAddressApiTableAdapter(data.items),
    columns: networkAddressTableColumns,
    state: {
      columnVisibility: {
        select: userData.role === 'super_admin',
      },
    },
  });

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.addressId);

  return (
    <div className="grid gap-4">
      <DataTable table={table} />
      <NetworksAddressDataTableToolbar
        disabled={!selectedIds.length}
        publicIds={selectedIds}
        onDelete={() => table.resetRowSelection()}
      />
    </div>
  );
};
