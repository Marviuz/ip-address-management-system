import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import { Button } from '@/components/common/button';
import { EditNetworkAddressSheet } from './edit-network-address-sheet';

type NetworkAddressTableColumns = {
  address: string;
  label: string;
  comments?: string;
};

const columnHelper = createColumnHelper<NetworkAddressTableColumns>();

export const networkAddressTableColumns: ColumnDef<
  NetworkAddressTableColumns,
  keyof NetworkAddressTableColumns
>[] = [
  columnHelper.accessor('address', {
    cell: (address) => address.getValue(),
    header: 'Address',
  }),
  columnHelper.display({
    cell: () => 'ip address | mac address',
    header: 'Type',
  }),
  columnHelper.accessor('label', {
    cell: (label) => label.getValue(),
    header: 'Label',
  }),
  columnHelper.accessor('comments', {
    cell: (comment) => comment.getValue(),
    header: 'Comments',
  }),
  columnHelper.display({
    cell: () => (
      <EditNetworkAddressSheet>
        <Button className="rounded-full" size="icon" variant="outline">
          <Edit />
        </Button>
      </EditNetworkAddressSheet>
    ),
    header: 'Actions',
  }),
];
