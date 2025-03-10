import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter, useSearch } from '@tanstack/react-router';
import { type FC } from 'react';
import { Input } from '@/components/common/input';
import { RouteBasedPagination } from '@/components/common/route-based-pagination';
import { queries } from '@/lib/queries';

export const AuditLogsTablePagination: FC = () => {
  const router = useRouter();
  const search = useSearch({
    from: '/_authenticated/activity-logs/',
  });
  const { data: logsData } = useSuspenseQuery(
    queries.auditLogs.all({ page: search.page, pageSize: search.pageSize }),
  );

  return (
    <div className="flex gap-4">
      <Input
        className="w-9 shrink-0 px-0 text-center"
        defaultValue={search.pageSize}
        type="text"
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            const pageSize = parseInt(e.currentTarget.value);
            e.preventDefault();
            await router.navigate({
              to: '/activity-logs',
              search: (prev) => ({ ...prev, pageSize }),
            });
          }
        }}
      />
      <RouteBasedPagination
        currentPage={search.page}
        to="/activity-logs"
        totalPages={logsData.pagination.totalPages}
      />
    </div>
  );
};
