import { useState, type FC } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  type AuditLogsAction,
  auditLogsActions,
} from '@ip-address-management-system/shared';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { Button } from '@/components/common/button';

export const AuditLogsFilters: FC = () => {
  const [open, setOpen] = useState(false);
  const { actions } = useSearch({ from: '/_authenticated/activity-logs/' });
  const navigate = useNavigate({ from: '/activity-logs' });

  const handleCheckChange = (value: boolean, act: AuditLogsAction) => {
    return navigate({
      search: (prev) => {
        let acts = [];
        if (value) acts = [...(prev.actions ?? []), act];
        else acts = (prev.actions ?? []).filter((a) => a !== act);

        return {
          ...prev,
          actions: acts,
        };
      },
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button>Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {auditLogsActions.map((act) => (
          <DropdownMenuCheckboxItem
            checked={actions?.includes(act)}
            className="capitalize"
            key={act}
            onCheckedChange={(value) => handleCheckChange(value, act)}
            onSelect={(evt) => evt.preventDefault()}
          >
            {act}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
