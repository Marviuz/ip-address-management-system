import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { snakeToNoCase } from '@ip-address-management-system/shared';
import { AuditLogDiffTable } from './audit-log-diff-table';
import { queries } from '@/lib/queries';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/common/table';
import { Card, CardHeader, CardTitle } from '@/components/common/card';

type AuditLogDetailsContentProps = {
  publicId: string;
};

export const AuditLogDetailsContent: FC<AuditLogDetailsContentProps> = ({
  publicId,
}) => {
  const { data } = useSuspenseQuery(queries.auditLogs.byPublicId({ publicId }));

  const shouldShowChanges =
    data.action === 'update' ||
    data.action === 'delete' ||
    data.action === 'create';

  const changes = Object.entries(data.changes);

  return (
    <div className="px-4">
      <div className="grid gap-8">
        <Card className="py-4">
          <CardHeader className="px-2">
            <CardTitle className="capitalize">{data.action}</CardTitle>
          </CardHeader>
          <Table>
            <TableBody>
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
            </TableBody>
          </Table>
        </Card>

        {shouldShowChanges ? (
          <Card className="overflow-clip p-0">
            <AuditLogDiffTable
              changes={changes}
              showNew={data.action === 'update' || data.action === 'create'}
              showOld={data.action === 'update' || data.action === 'delete'}
            />
          </Card>
        ) : null}

        <Card className="py-4">
          <CardHeader className="px-2">
            <CardTitle>Initiator</CardTitle>
          </CardHeader>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Given Name:</TableCell>
                <TableCell>{data.user.givenName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Family Name:</TableCell>
                <TableCell>{data.user.familyName}</TableCell>
              </TableRow>
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
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
