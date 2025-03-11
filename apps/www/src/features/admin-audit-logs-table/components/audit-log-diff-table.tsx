import { type PrimitiveSchema } from '@ip-address-management-system/shared';
import { type FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';

type AuditLogDiffTableProps = {
  changes: [string, Record<'old' | 'new', PrimitiveSchema>][];
  showOld: boolean;
  showNew: boolean;
};

export const AuditLogDiffTable: FC<AuditLogDiffTableProps> = ({
  changes,
  showOld,
  showNew,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Property</TableHead>
          {showOld ? <TableHead>Old</TableHead> : null}
          {showNew ? <TableHead>New</TableHead> : null}
        </TableRow>
      </TableHeader>
      <TableBody>
        {changes.map(([key, value]) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            {showOld ? <TableCell>{value.old?.toString()}</TableCell> : null}
            {showNew ? <TableCell>{value.new?.toString()}</TableCell> : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
