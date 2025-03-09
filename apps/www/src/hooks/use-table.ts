import {
  getCoreRowModel,
  type TableOptions,
  useReactTable,
} from '@tanstack/react-table';

export function useTable<TData>(
  params: Omit<TableOptions<TData>, 'getCoreRowModel'>,
) {
  const table = useReactTable({
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    debugTable: process.env.NODE_ENV === 'development',
    ...params,
  });

  return table;
}
