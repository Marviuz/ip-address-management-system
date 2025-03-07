'use client';

import { Edit } from 'lucide-react';
import { type FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/common/button';

type EditNetworkAddressSelectorProps = {
  publicId: string;
};

export const EditNetworkAddressSelector: FC<
  EditNetworkAddressSelectorProps
> = ({ publicId }) => {
  return (
    <Button asChild className="rounded-full" size="icon" variant="outline">
      <Link href={{ query: { edit: publicId } }}>
        <Edit />
      </Link>
    </Button>
  );
};
