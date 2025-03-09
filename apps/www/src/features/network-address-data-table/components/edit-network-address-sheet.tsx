import { useRouter, useSearch } from '@tanstack/react-router';
import { Suspense, type FC } from 'react';
import { EditNetworkAddressForm } from './edit-network-address-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/common/sheet';

export const EditNetworkAddressSheet: FC = () => {
  const search = useSearch({
    from: '/_authenticated/dashboard/',
  });
  const router = useRouter();

  return (
    <Sheet
      open={!!search.edit}
      onOpenChange={(open) =>
        !open &&
        router.navigate({
          to: '/dashboard',
          search: (prev) => ({ ...prev, edit: undefined }),
        })
      }
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Modify Network Address</SheetTitle>
          <SheetDescription>Modify network address details.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          {search.edit ? (
            <Suspense fallback={<div>Loading...</div>}>
              <EditNetworkAddressForm publicId={search.edit} />
            </Suspense>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
};
