import { Plus } from 'lucide-react';
import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { Button } from '@/components/common/button';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';
import { AddNetworkAddressDialog } from '@/features/network-address-data-table/components/add-network-address-dialog';
import { api } from '@/lib/api-client';

export default withAuth(async function RegularDashboardPage() {
  const data = await api.private(
    (client) => client.get('network-address').json(),
    networkAddressListSchema,
  );

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-4">
          <pre>{JSON.stringify(data, null, 2)}</pre>
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
