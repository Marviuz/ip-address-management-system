'use client';

import { type FC } from 'react';
import { DataTable } from '@/components/common/data-table';
import { ipTableColumns } from './columns';

export const IpDataTable: FC = () => {
  return (
    <DataTable
      columns={ipTableColumns}
      data={[
        { address: 'something', label: 'label' },
        { address: 'something', label: 'label', comments: 'comments' },
      ]}
    />
  );
};
