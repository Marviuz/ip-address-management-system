import { type FC } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { networkAddressTableColumns } from './columns';
import { DataTable } from '@/components/common/data-table';
import { networkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';
import { queries } from '@/lib/queries';

export const NetworkAddressDataTable: FC = () => {
  const { data } = useSuspenseQuery({
    ...queries.networkAddress.all,
    staleTime: 0,
  });

  return (
    <DataTable
      columns={networkAddressTableColumns}
      data={networkAddressApiTableAdapter(data.items)}
    />
  );
};
