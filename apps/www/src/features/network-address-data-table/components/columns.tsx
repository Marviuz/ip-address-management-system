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
    header: 'Address',
    cell: (address) => address.getValue(),
  }),
  columnHelper.display({
    header: 'Type',
    cell: ({ row }) => getNetworkAddressType(row.original.address),
  }),
  columnHelper.accessor('label', {
    header: 'Label',
    cell: (label) => label.getValue(),
  }),
  columnHelper.accessor('comments', {
    header: 'Comments',
    cell: (comment) => comment.getValue(),
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => (
      <div className="flex gap-4">
        <EditNetworkAddressButton publicId={row.original.addressId} />
        {!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected() ? (
          <DeleteNetworkAddressButton
            publicIds={[row.original.addressId]}
            onDelete={() => table.resetRowSelection()}
          />
        ) : null}
      </div>
    ),
  }),
];
