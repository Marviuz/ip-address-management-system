import { type FC } from 'react';
import { HeaderUserDetails } from './header-user-details';
import { cn } from '@/utils/cn';
import { useSuspenseAuthedUser } from '@/hooks/use-user-queries';

export const Header: FC = () => {
  const { data: user } = useSuspenseAuthedUser();

  const isRegular = user.role === 'regular';

  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'flex h-14 items-center',
            isRegular ? 'justify-between' : 'justify-end',
          )}
        >
          {isRegular ? (
            <h1 className="font-extrabold tracking-tight">
              IP Address Management System
            </h1>
          ) : null}
          <div>
            <HeaderUserDetails />
          </div>
        </div>
      </div>
    </header>
  );
};
