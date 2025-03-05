'use client';

import { type FC } from 'react';
import { DataTable } from '@/components/common/data-table';
import { networkAddressTableColumns } from './columns';

export const NetworkAddressDataTable: FC = () => {
  return (
    <DataTable
      columns={networkAddressTableColumns}
      data={[
        { address: 'something', label: 'label' },
        { address: 'something', label: 'label', comments: 'comments' },
      ]}
    />
  );
};
