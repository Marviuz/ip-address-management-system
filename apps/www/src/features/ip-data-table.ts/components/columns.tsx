import { createColumnHelper } from '@tanstack/react-table';
import { Button } from '@/components/common/button';

type IpTableColumns = {
  address: string;
  label: string;
  comments?: string;
};

const columnHelper = createColumnHelper<IpTableColumns>();

export const ipTableColumns = [
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
    cell: () => <Button>Edit</Button>,
    header: 'Actions',
  }),
];
