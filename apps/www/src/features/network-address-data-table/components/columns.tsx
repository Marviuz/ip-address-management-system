'use client';

import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { getNetworkAddressType } from '../utils/get-network-address-type';
import { EditNetworkAddressSelector } from './edit-network-address-selector';

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
      <EditNetworkAddressSelector publicId={row.original.addressId} />
    ),
    header: 'Actions',
  }),
];
