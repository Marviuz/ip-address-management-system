import { Plus } from 'lucide-react';
import { Button } from '@/components/common/button';
import { IpDataTable } from '@/features/ip-data-table.ts/components';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';
import { AddIpDialog } from '@/features/ip-data-table.ts/components/add-ip-dialog';

export default withAuth(function RegularDashboardPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4">
          <IpDataTable />
          <div>
            <AddIpDialog>
              <Button className="ml-auto flex">
                <Plus />
                Add
              </Button>
            </AddIpDialog>
          </div>
        </div>
        <form>
          <Button formAction={signOut}>Sign Out</Button>
        </form>
      </div>
    </main>
  );
});
