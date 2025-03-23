import { type ColumnDef } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { Skeleton } from './skeleton';

type DataTableSkeletonProps<TData> = {
  columns: ColumnDef<TData>[];
};

export const DataTableSkeleton = <TData,>({
  columns,
}: DataTableSkeletonProps<TData>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col, colIndex) => (
            // eslint-disable-next-line react/no-array-index-key -- static row
            <TableHead key={`${col.id}-${colIndex}`}>
              <Skeleton className="my-2 h-4" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_row, rowIndex) => (
          // eslint-disable-next-line react/no-array-index-key -- static row
          <TableRow key={rowIndex}>
            {columns.map((col, colIndex) => (
              // eslint-disable-next-line react/no-array-index-key -- static row
              <TableCell key={`${col.id}-${colIndex}`}>
                <Skeleton className="my-2 h-4" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
