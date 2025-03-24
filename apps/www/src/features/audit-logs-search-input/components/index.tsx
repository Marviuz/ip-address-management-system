import { useNavigate, useSearch } from '@tanstack/react-router';
import { type FC, useDeferredValue, useState } from 'react';
import { Input } from '@/components/common/input';

export const AuditLogsSearchInput: FC = () => {
  const { q } = useSearch({ from: '/_authenticated/activity-logs/' });
  const [value, setValue] = useState(q);
  const deferredValue = useDeferredValue(value);
  const navigate = useNavigate({ from: '/activity-logs' });

  return (
    <div>
      <Input
        defaultValue={deferredValue}
        placeholder="Search..."
        onChange={(e) => setValue(e.currentTarget.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            await navigate({
              search: (prev) => ({ ...prev, q: deferredValue }),
            });
          }
        }}
      />
    </div>
  );
};
