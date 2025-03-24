import {
  getReadableNetworkAddressType,
  networkTypes,
} from '@ip-address-management-system/shared';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Checkbox } from '@/components/common/checkbox';
import { Label } from '@/components/common/label';

export const NetworkAddressFilter = () => {
  const { type } = useSearch({ from: '/_authenticated/dashboard/' });
  const navigate = useNavigate({ from: '/dashboard' });

  return (
    <div className="flex gap-4">
      {networkTypes.map((netType) => (
        <Label key={netType}>
          <Checkbox
            checked={type === netType}
            value={netType}
            onCheckedChange={(value) => {
              if (value) {
                return navigate({
                  search: (prev) => ({ ...prev, type: netType }),
                });
              }

              return navigate({
                search: (prev) => ({ ...prev, type: undefined }),
              });
            }}
          />
          <span>{getReadableNetworkAddressType(netType)}</span>
        </Label>
      ))}
    </div>
  );
};
