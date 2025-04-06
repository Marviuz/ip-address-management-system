import { type FC, type PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const NetworkAddressInputWrapper: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div
      className={cn(
        'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground shadow-xs flex h-9 w-full min-w-0 shrink-0 items-center gap-2 rounded-md border bg-transparent px-3 py-1 text-base outline-none transition-[color,box-shadow] md:text-sm [&:has(:disabled)]:pointer-events-none [&:has(:disabled)]:cursor-not-allowed [&:has(:disabled)]:opacity-50',
        'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]',
        '[&:has([aria-invalid=true])]:ring-destructive/20 [&:has([aria-invalid=true])]:dark:ring-destructive/40 [&:has([aria-invalid=true])]:border-destructive',
      )}
    >
      {children}
    </div>
  );
};
