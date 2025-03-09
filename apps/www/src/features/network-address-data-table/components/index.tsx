import { useState, type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { networkAddressTableColumns } from './columns';
import { DataTable } from '@/components/common/data-table';
import { networkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';
import { queries } from '@/lib/queries';
import { useTable } from '@/hooks/use-table';

export const NetworkAddressDataTable: FC = () => {
  const { data } = useSuspenseQuery({
    ...queries.networkAddress.all,
    staleTime: 0,
  });

  const [rowSelection, setRowSelection] = useState({});

  const table = useTable({
    data: networkAddressApiTableAdapter(data.items),
    columns: networkAddressTableColumns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
  });

  return <DataTable table={table} />;
};
