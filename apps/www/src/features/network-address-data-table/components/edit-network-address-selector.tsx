import { Edit } from 'lucide-react';
import { type FC } from 'react';
import { Button } from '@/components/common/button';

type EditNetworkAddressSelectorProps = {
  publicId: string;
};

export const EditNetworkAddressSelector: FC<
  EditNetworkAddressSelectorProps
> = ({ publicId }) => {
  return (
    <Button
      className="rounded-full"
      data-id={publicId}
      size="icon"
      variant="outline"
    >
      <Edit />
    </Button>
  );
};
