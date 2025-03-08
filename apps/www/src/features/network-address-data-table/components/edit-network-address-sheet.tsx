import { type FC, type ReactNode } from 'react';
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
  return (
    <Sheet>
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
