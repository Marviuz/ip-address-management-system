import { type FC } from 'react';
import { DataTable } from '@/components/common/data-table';
import {
  type NetworkAddressTableColumns,
  networkAddressTableColumns,
} from './columns';

type NetworkAddressDataTableProps = {
  data: NetworkAddressTableColumns[];
};

export const NetworkAddressDataTable: FC<NetworkAddressDataTableProps> = ({
  data,
}) => {
  return <DataTable columns={networkAddressTableColumns} data={data} />;
};
