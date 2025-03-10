import { type FC } from 'react';
import { HeaderUserDetails } from './header-user-details';

export const Header: FC = () => {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <h1 className="font-extrabold tracking-tight">
            IP Address Management System
          </h1>
          <div>
            <HeaderUserDetails />
          </div>
        </div>
      </div>
    </header>
  );
};
