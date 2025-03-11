import { useRouter, useSearch } from '@tanstack/react-router';
import { type FC } from 'react';
import { Input } from '@/components/common/input';
import { RouteBasedPagination } from '@/components/common/route-based-pagination';
import { Label } from '@/components/common/label';
import { useAllAuditLogs } from '@/hooks/use-audit-log-queries';

export const AuditLogsTablePagination: FC = () => {
  const router = useRouter();
  const search = useSearch({
    from: '/_authenticated/activity-logs/',
  });
  const { data: logsData } = useAllAuditLogs({
    page: search.page,
    pageSize: search.pageSize,
  });

  return (
    <div className="flex items-center gap-4">
      <Label className="flex shrink-0 items-center gap-4">
        Items per page:
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
      </Label>
      <RouteBasedPagination
        currentPage={search.page}
        to="/activity-logs"
        totalPages={logsData.pagination.totalPages}
      />
    </div>
  );
};
