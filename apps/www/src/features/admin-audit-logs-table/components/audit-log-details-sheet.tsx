import { useNavigate, useSearch } from '@tanstack/react-router';
import { Suspense, type FC } from 'react';
import { AuditLogDetailsContent } from './audit-log-details-content';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/common/sheet';

export const AuditLogDetailsSheet: FC = () => {
  const navigate = useNavigate({
    from: '/activity-logs',
  });
  const { preview } = useSearch({
    from: '/_authenticated/activity-logs/',
  });

  return (
    <Sheet
      open={!!preview}
      onOpenChange={(open) =>
        !open &&
        navigate({ search: (prev) => ({ ...prev, preview: undefined }) })
      }
    >
      <SheetContent className="w-[calc(theme(width.full)-theme(width.20))] sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Audit Log Details</SheetTitle>
          <SheetDescription>View details of the audit log</SheetDescription>
        </SheetHeader>
        {preview ? (
          <Suspense fallback={<div>Loading...</div>}>
            <AuditLogDetailsContent publicId={preview} />
          </Suspense>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};
