import { createColumnHelper } from '@tanstack/react-table';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import { DeleteNetworkAddressButton } from './delete-network-address-button';
import { EditNetworkAddressButton } from './edit-network-address-button';
import { DateTimeDetailsHoverCard } from '@/components/datetime-details-hover-card';
import { Checkbox } from '@/components/common/checkbox';

export type NetworkAddressTableColumns = {
  address: string;
  label: string;
  comments?: string;
  addressId: string;
  addedAt: Date;
  modifiedAt: Date;
};

const columnHelper = createColumnHelper<NetworkAddressTableColumns>();

export const networkAddressTableColumns = [
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
    cell: ({ cell }) => cell.getValue(),
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
  columnHelper.accessor('addedAt', {
    header: 'Date Added',
    cell: ({ cell, row }) => (
      <DateTimeDetailsHoverCard
        createdAt={cell.getValue()}
        updatedAt={row.original.modifiedAt}
      />
    ),
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
