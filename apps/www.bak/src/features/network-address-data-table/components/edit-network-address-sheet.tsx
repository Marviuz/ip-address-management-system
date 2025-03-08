'use client';

import { type FC, type ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/common/sheet';

type EditNetworkAddressSheetProps = {
  children: ReactNode;
};

export const EditNetworkAddressSheet: FC<EditNetworkAddressSheetProps> = ({
  children,
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const publicId = params.get('edit');

  return (
    <Sheet
      open={!!publicId}
      onOpenChange={(open) => !open && router.push('/dashboard')}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modify Network Address</SheetTitle>
          <SheetDescription>Modify network address details.</SheetDescription>
        </SheetHeader>
        <div className="px-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
};
