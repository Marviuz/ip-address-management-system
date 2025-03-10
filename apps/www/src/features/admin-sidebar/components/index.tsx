import { type FC } from 'react';

export const AdminSidebar: FC = () => {
  return (
    <aside className="sticky top-0 h-svh w-full max-w-72 border-r">
      <div className="grid h-14 place-items-center">
        <h1 className="font-extrabold tracking-tight">
          IP Address Management System
        </h1>
      </div>

      <div className="p-4">{/* TODO: Content */}</div>
    </aside>
  );
};
