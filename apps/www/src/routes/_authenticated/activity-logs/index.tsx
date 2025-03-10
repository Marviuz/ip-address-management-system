import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/activity-logs/')({
  component: ActivityLogsPage,
});

function ActivityLogsPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">TODO: activity logs table</div>
    </main>
  );
}
