import { useNavigate } from '@tanstack/react-router';
import { useDeferredValue, useState, type FC } from 'react';
import { Input } from '@/components/common/input';

export const NetworkAddressSearchInput: FC = () => {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);
  const navigate = useNavigate({ from: '/dashboard' });

  return (
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
  );
};
