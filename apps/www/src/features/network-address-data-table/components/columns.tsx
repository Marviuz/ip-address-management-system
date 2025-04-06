import { createColumnHelper } from '@tanstack/react-table';
import { getNetworkAddressType } from '@ip-address-management-system/shared';
import { DeleteNetworkAddressButton } from './delete-network-address-button';
import { EditNetworkAddressButton } from './edit-network-address-button';
import { TableSortHeader } from './table-sort-header';
import { DateTimeDetailsHoverCard } from '@/components/datetime-details-hover-card';
import { Checkbox } from '@/components/common/checkbox';
import { Badge } from '@/components/common/badge';

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
    header: () => (
      <TableSortHeader sortKey="networkAddress">Address</TableSortHeader>
    ),
    cell: ({ cell }) => cell.getValue(),
  }),
  columnHelper.display({
    id: 'addressType',
    header: () => <TableSortHeader sortKey="type">Type</TableSortHeader>,
    cell: ({ row }) => (
      <Badge>{getNetworkAddressType(row.original.address).readable}</Badge>
    ),
  }),
  columnHelper.accessor('label', {
    header: () => <TableSortHeader sortKey="label">Label</TableSortHeader>,
    cell: (label) => label.getValue(),
  }),
  columnHelper.accessor('comments', {
    header: () => (
      <TableSortHeader sortKey="comments">Comments</TableSortHeader>
    ),
    cell: (comment) => comment.getValue(),
  }),
  columnHelper.accessor('addedAt', {
    header: () => (
      <TableSortHeader sortKey="createdAt">Date Added</TableSortHeader>
    ),
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
