import { type PropsWithChildren, type FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/common/sheet';
import { NetworkAddressForm } from './network-address-form';

export const EditNetworkAddressSheet: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modify Network Address</SheetTitle>
          <SheetDescription>Modify network address details.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <NetworkAddressForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};
