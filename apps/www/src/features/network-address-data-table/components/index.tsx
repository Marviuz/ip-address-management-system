import { type FC } from 'react';
import { useGetNetworkAddress } from '../lib/services/get-network-addresses';
import { networkAddressTableColumns } from './columns';
import { DataTable } from '@/components/common/data-table';
import { networkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';

export const NetworkAddressDataTable: FC = () => {
  const { data } = useGetNetworkAddress();

  return (
    <DataTable
      columns={networkAddressTableColumns}
      data={networkAddressApiTableAdapter(data.items)}
    />
  );
};
