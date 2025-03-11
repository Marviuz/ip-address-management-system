import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { queries } from '@/lib/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';

type AuditLogDetailsContentProps = {
  publicId: string;
};

export const AuditLogDetailsContent: FC<AuditLogDetailsContentProps> = ({
  publicId,
}) => {
  const { data } = useSuspenseQuery(queries.auditLogs.byPublicId({ publicId }));

  const changes = Object.entries(data.changes);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead>Old</TableHead>
          <TableHead>New</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {changes.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{value.old?.toString()}</TableCell>
            <TableCell>{value.new?.toString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
