import { type FC } from 'react';
import { type LinkComponentProps } from '@tanstack/react-router';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';
import { createPageNumbers } from '@/utils/create-page-numbers';

export type RouteBasedPaginationProps = {
  currentPage: number;
  totalPages: number;
  to: LinkComponentProps['to'];
};

export const RouteBasedPagination: FC<RouteBasedPaginationProps> = ({
  currentPage,
  totalPages,
  to,
}) => {
  const { next, prev, pages } = createPageNumbers(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            search={(prevParams) => ({ ...prevParams, page: prev })}
            to={to}
          />
        </PaginationItem>
        {pages.map((page, key) => (
          // eslint-disable-next-line react/no-array-index-key -- page can have a value of -1
          <PaginationItem key={`${key}-${page}`}>
            {page > 0 ? (
              <PaginationLink
                isActive={page === currentPage}
                search={{ page }}
                to={to}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            search={(prevParams) => ({ ...prevParams, page: next })}
            to={to}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
