import { Plus } from 'lucide-react';
import { Button } from '@/components/common/button';
import { NetworkAddressDataTable } from '@/features/network-address-data-table.ts/components';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';
import { AddNetworkAddressDialog } from '@/features/network-address-data-table.ts/components/add-network-address-dialog';

export default withAuth(function RegularDashboardPage() {
  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4">
          <NetworkAddressDataTable />
          <div>
            <AddNetworkAddressDialog>
              <Button className="ml-auto flex">
                <Plus />
                Add
              </Button>
            </AddNetworkAddressDialog>
          </div>
        </div>
        <form>
          <Button formAction={signOut}>Sign Out</Button>
        </form>
      </div>
    </main>
  );
});
