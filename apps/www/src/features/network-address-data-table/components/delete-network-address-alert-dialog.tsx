import { type FC, type ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/common/alert-dialog';

type DeleteNetworkAddressAlertDialogProps = {
  children?: ReactNode;
  isPlural: boolean;
  onContinue: () => void;
};

export const DeleteNetworkAddressAlertDialog: FC<
  DeleteNetworkAddressAlertDialogProps
> = ({ onContinue, children, isPlural }) => {
  const networkAddress = isPlural ? 'network addresses' : 'network address';
  const demonstrative = isPlural ? 'these' : 'this';

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete {demonstrative} {networkAddress}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected {networkAddress} and permanently remove it from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
