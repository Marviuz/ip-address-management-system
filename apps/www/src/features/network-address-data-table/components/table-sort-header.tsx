import { type ReactNode, useNavigate, useSearch } from '@tanstack/react-router';
import { ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import { type FC } from 'react';
import { type GetNetworkAddressSchema } from '@ip-address-management-system/shared';
import { Button } from '@/components/common/button';

type TableSortButtonProps = {
  sortKey: GetNetworkAddressSchema['sort'];
  children: ReactNode;
};

const Icon: FC<Partial<{ sort: string; sortKey: string; order: string }>> = ({
  sort,
  sortKey,
  order,
}) => {
  if (typeof sort === 'undefined' || typeof order === 'undefined')
    return <ArrowUpDown />;
  if (sort === sortKey && order === 'asc') return <SortAsc />;
  if (sort === sortKey && order === 'desc') return <SortDesc />;
  return <ArrowUpDown />;
};

export const TableSortHeader: FC<TableSortButtonProps> = ({
  children,
  sortKey,
}) => {
  const navigate = useNavigate({ from: '/dashboard' });
  const { sort, order } = useSearch({ from: '/_authenticated/dashboard/' });

  const handleSort = async () => {
    await navigate({
      search: (prev) => ({
        ...prev,
        sort: sortKey,
        order: order === 'desc' ? 'asc' : 'desc',
      }),
    });
  };

  return (
    <div className="flex items-center gap-2">
      {children}
      <Button size="icon" type="button" variant="ghost" onClick={handleSort}>
        <Icon order={order} sort={sort} sortKey={sortKey} />
      </Button>
    </div>
  );
};
