import { type SQL } from 'drizzle-orm';
import { type PgColumn, type PgSelect } from 'drizzle-orm/pg-core';

export async function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page: number,
  pageSize: number,
  totalItems: number,
) {
  const data = await qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  if (typeof totalItems === 'undefined') {
    throw new Error('Total items should be defined');
  }

  const totalPages = Math.ceil(totalItems / pageSize);

  return {
    data,
    pagination: {
      currentPage: page,
      pageSize,
      totalPages,
      totalItems,
    },
  };
}
