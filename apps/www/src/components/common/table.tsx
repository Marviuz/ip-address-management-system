import type * as React from 'react';
import { cn } from '@/utils/cn';

const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
  return (
    <div
      className="relative w-full overflow-x-auto"
      data-slot="table-container"
    >
      <table
        className={cn('w-full caption-bottom text-sm', className)}
        data-slot="table"
        {...props}
      />
    </div>
  );
};

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<'thead'>) => {
  return (
    <thead
      className={cn('[&_tr]:border-b', className)}
      data-slot="table-header"
      {...props}
    />
  );
};

const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
  return (
    <tbody
      className={cn('[&_tr:last-child]:border-0', className)}
      data-slot="table-body"
      {...props}
    />
  );
};

const TableFooter = ({
  className,
  ...props
}: React.ComponentProps<'tfoot'>) => {
  return (
    <tfoot
      className={cn(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0',
        className,
      )}
      data-slot="table-footer"
      {...props}
    />
  );
};

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  return (
    <tr
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
};

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  return (
    <th
      className={cn(
        'text-muted-foreground h-10 whitespace-nowrap px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
};

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  return (
    <td
      className={cn(
        'whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      data-slot="table-cell"
      {...props}
    />
  );
};

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<'caption'>) => {
  return (
    <caption
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      data-slot="table-caption"
      {...props}
    />
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
