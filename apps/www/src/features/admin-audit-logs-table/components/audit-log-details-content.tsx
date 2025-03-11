import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { snakeToNoCase } from '@ip-address-management-system/shared';
import { queries } from '@/lib/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import { Card, CardHeader } from '@/components/common/card';

type AuditLogDetailsContentProps = {
  publicId: string;
};

export const AuditLogDetailsContent: FC<AuditLogDetailsContentProps> = ({
  publicId,
}) => {
  const { data } = useSuspenseQuery(queries.auditLogs.byPublicId({ publicId }));

  const isUpdateAction = data.action === 'update';
  const changes = Object.entries(data.changes);

  return (
    <div className="grid gap-8">
      <Table>
        {isUpdateAction ? (
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>Old</TableHead>
              <TableHead>New</TableHead>
            </TableRow>
          </TableHeader>
        ) : null}
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

      <div className="px-4">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Initiator</h2>
          </CardHeader>
          <Table>
            <TableRow>
              <TableCell>Username:</TableCell>
              <TableCell>{data.user.username}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email:</TableCell>
              <TableCell>{data.user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Role:</TableCell>
              <TableCell className="capitalize">
                {snakeToNoCase(data.user.role)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IP Address:</TableCell>
              <TableCell>{data.ipAddress}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>User Agent:</TableCell>
              <TableCell>{data.userAgent}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Action:</TableCell>
              <TableCell className="capitalize">{data.action}</TableCell>
            </TableRow>
          </Table>
        </Card>
      </div>
    </div>
  );
};
