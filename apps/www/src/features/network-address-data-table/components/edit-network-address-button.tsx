import { Link } from '@tanstack/react-router';
import { Edit } from 'lucide-react';
import { type FC } from 'react';
import { Button } from '@/components/common/button';

type EditNetworkAddressSelectorProps = {
  publicId: string;
};

export const EditNetworkAddressButton: FC<EditNetworkAddressSelectorProps> = ({
  publicId,
}) => {
  return (
    <Button asChild className="rounded-full" size="icon" variant="outline">
      <Link search={{ edit: publicId }} to="/dashboard">
        <Edit />
      </Link>
    </Button>
  );
};
