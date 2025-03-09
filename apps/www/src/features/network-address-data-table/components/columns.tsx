import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import { EditNetworkAddressButton } from './edit-network-address-button';
import { DeleteNetworkAddressButton } from './delete-network-address-button';
import { Checkbox } from '@/components/common/checkbox';

export type NetworkAddressTableColumns = {
  address: string;
  label: string;
  comments?: string;
  addressId: string;
};

const columnHelper = createColumnHelper<NetworkAddressTableColumns>();

export const networkAddressTableColumns: ColumnDef<
  NetworkAddressTableColumns,
  keyof NetworkAddressTableColumns
>[] = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center">
        <Checkbox
          checked={
            table.getIsAllRowsSelected() ||
            (table.getIsSomeRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
  }),
  columnHelper.accessor('address', {
    cell: (address) => address.getValue(),
    header: 'Address',
  }),
  columnHelper.display({
    cell: ({ row }) => getNetworkAddressType(row.original.address),
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
    cell: ({ row }) => (
      <div className="flex gap-4">
        <EditNetworkAddressButton publicId={row.original.addressId} />
        <DeleteNetworkAddressButton publicId={row.original.addressId} />
      </div>
    ),
    header: 'Actions',
  }),
];
