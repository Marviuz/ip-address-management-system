import { type FC } from 'react';
import { ChevronDown, Loader2, LogOut } from 'lucide-react';
import { snakeToNoCase } from '@ip-address-management-system/shared';
import { Button } from '@/components/common/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/common/popover';
import { useLogout } from '@/hooks/use-logout';
import { useSuspenseAuthedUser } from '@/hooks/use-user-queries';

export const HeaderUserDetails: FC = () => {
  const { logout, isLoggingOut } = useLogout();
  const { data: userData } = useSuspenseAuthedUser();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="group" variant="ghost">
          {userData.username ??
            `${userData.givenName} ${userData.familyName ?? ''} `}
          <ChevronDown className="transition group-data-[state=open]:rotate-180" />
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
            disabled={isLoggingOut}
            size="sm"
            type="button"
            variant="outline"
            onClick={() => logout()}
          >
            {isLoggingOut ? 'Logging out' : 'Log out'}
            {isLoggingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
