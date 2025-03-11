import { format, formatDistanceToNow, isEqual } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';
import { type FC } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/common/hover-card';

type DateTimeDetailsHoverCardProps = {
  createdAt: Date;
  createdLabel?: string;
  updatedAt?: Date;
  updatedLabel?: string;
};

export const DateTimeDetailsHoverCard: FC<DateTimeDetailsHoverCardProps> = ({
  createdAt,
  updatedAt,
  createdLabel = 'Date added',
  updatedLabel = 'Date modified',
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-xs underline decoration-dotted underline-offset-4 transition">
          {format(createdAt, 'yyyy-MM-dd HH:mm:ss')}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full max-w-80">
        <div className="space-y-4">
          <div>
            <h4 className="flex items-center text-sm font-semibold">
              <CalendarDays className="mr-2 h-4 w-4" />
              {createdLabel}
            </h4>
            <div className="ml-6 mt-1 space-y-1">
              <div className="text-muted-foreground text-sm">
                {format(createdAt, 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="text-muted-foreground text-sm">
                {format(createdAt, 'h:mm a')}
              </div>
              <div className="text-muted-foreground text-xs">
                {formatDistanceToNow(createdAt, { addSuffix: true })}
              </div>
            </div>
          </div>

          {updatedAt && !isEqual(createdAt.toString(), updatedAt.toString()) ? (
            <div>
              <h4 className="flex items-center text-sm font-semibold">
                <Clock className="mr-2 h-4 w-4" />
                {updatedLabel}
              </h4>
              <div className="ml-6 mt-1 space-y-1">
                <div className="text-muted-foreground text-sm">
                  {format(updatedAt, 'EEEE, MMMM d, yyyy')}
                </div>
                <div className="text-muted-foreground text-sm">
                  {format(updatedAt, 'h:mm a')}
                </div>
                <div className="text-muted-foreground text-xs">
                  {formatDistanceToNow(updatedAt, {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
