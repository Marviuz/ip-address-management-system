import { Link } from '@tanstack/react-router';
import { type FC } from 'react';
import { Button } from '@/components/common/button';
import { Route as activityLogsRoute } from '@/routes/_authenticated/activity-logs';
import { Route as networkAddressRoute } from '@/routes/_authenticated/dashboard';

export const AdminSidebar: FC = () => {
  return (
    <aside className="sticky top-0 h-svh w-full max-w-72 shrink-0 border-r">
      <div className="grid h-14 place-items-center">
        <h1 className="font-extrabold tracking-tight">
          IP Address Management System
        </h1>
      </div>

      <div className="p-4">
        <div className="grid">
          <Button
            asChild
            className="justify-start data-[status=active]:border"
            variant="ghost"
          >
            <Link to={networkAddressRoute.to}>Network Addresses</Link>
          </Button>
          <Button
            asChild
            className="justify-start data-[status=active]:border"
            variant="ghost"
          >
            <Link to={activityLogsRoute.to}>Activity Logs</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
};
