import { Link, type LinkComponentProps } from '@tanstack/react-router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import type * as React from 'react';
import { buttonVariants } from './button/variants';
import { type Button } from './button';
import { cn } from '@/utils/cn';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => {
  return (
    <nav
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
};

const PaginationContent = ({
  className,
  ...props
}: React.ComponentProps<'ul'>) => {
  return (
    <ul
      className={cn('flex flex-row items-center gap-1', className)}
      data-slot="pagination-content"
      {...props}
    />
  );
};

const PaginationItem = ({ ...props }: React.ComponentProps<'li'>) => {
  return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  LinkComponentProps;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className,
      )}
      data-active={isActive}
      data-slot="pagination-link"
      {...props}
    />
  );
};

const PaginationPrevious = (
  props: React.ComponentProps<typeof PaginationLink>,
) => {
  return (
    <PaginationLink aria-label="Go to previous page" {...props}>
      <ChevronLeftIcon />
    </PaginationLink>
  );
};

const PaginationNext = (props: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink aria-label="Go to next page" {...props}>
      <ChevronRightIcon />
    </PaginationLink>
  );
};

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => {
  return (
    <span
      aria-hidden
      className={cn('flex size-9 items-center justify-center', className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
