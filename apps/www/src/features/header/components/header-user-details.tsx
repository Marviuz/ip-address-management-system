import { useSuspenseQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import { LogOut } from 'lucide-react';
import { snakeToNoCase } from '@ip-address-management-system/shared';
import { Button } from '@/components/common/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/popover';
import { useLogout } from '@/hooks/use-logout';
import { queries } from '@/lib/queries';

export const HeaderUserDetails: FC = () => {
  const { logout } = useLogout();
  const { data: userData } = useSuspenseQuery(queries.users.me);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          {userData.username ??
            `${userData.givenName} ${userData.familyName ?? ''} `}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-2">
          <div className="font-bold">{`${userData.givenName} ${userData.familyName ?? ''}`}</div>
          {userData.username ? <div>{userData.username}</div> : null}
          <div className="text-muted-foreground text-xs capitalize">
            {snakeToNoCase(userData.role)}
          </div>
          <div className="text-muted-foreground text-sm">{userData.email}</div>
          <Button
            size="sm"
            type="button"
            variant="outline"
            onClick={() => logout()}
          >
            Logout
            <LogOut />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
