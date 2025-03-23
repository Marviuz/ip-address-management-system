import { Edit, Loader2, Plus } from 'lucide-react';
import { type FC } from 'react';

type NetworkAddressFormSubmitButtonProps = {
  mode?: 'create' | 'edit';
  isLoading?: boolean;
};

export const NetworkAddressFormSubmitButtonLabel: FC<
  NetworkAddressFormSubmitButtonProps
> = ({ isLoading, mode }) => {
  if (isLoading) {
    return (
      <>
        <Loader2 className="animate-spin" />
        {mode === 'edit' ? 'Saving' : 'Adding'}
      </>
    );
  }

  return (
    <>
      {mode === 'edit' ? <Edit /> : null}
      {mode === 'create' ? <Plus /> : null}
      {mode === 'edit' ? 'Edit' : 'Add'}
    </>
  );
};
