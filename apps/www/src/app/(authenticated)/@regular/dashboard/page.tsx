import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { Plus } from 'lucide-react';
import { Suspense } from 'react';
import { Button } from '@/components/common/button';
import { NetworkAddressDataTable } from '@/features/network-address-data-table/components';
import { AddNetworkAddressDialog } from '@/features/network-address-data-table/components/add-network-address-dialog';
import { EditNetworkAddressSheet } from '@/features/network-address-data-table/components/edit-network-address-sheet';
import { SuspendedNetworkAddressForm } from '@/features/network-address-data-table/components/suspended-network-address-form';
import { NetworkAddressApiTableAdapter } from '@/lib/adapters/network-address-api-table-adapter';
import { api } from '@/lib/api-client';
import { signOut } from '@/lib/auth';
import { withAuth } from '@/lib/with-auth';
import { type PageProps } from '@/utils/app-props';

export default withAuth<PageProps<unknown, { edit: string }>>(
  async function RegularDashboardPage({ searchParams }) {
    const [{ edit }, data] = await Promise.all([
      searchParams,
      api.private(
        (client) => client.get('network-address').json(),
        networkAddressListSchema,
      ),
    ]);

    return (
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-4">
            {String(edit)}
            <NetworkAddressDataTable
              data={NetworkAddressApiTableAdapter(data.items)}
            />
            <EditNetworkAddressSheet>
              {edit ? (
                <Suspense fallback={<div>Loading...</div>}>
                  <SuspendedNetworkAddressForm publicId={edit} />
                </Suspense>
              ) : null}
            </EditNetworkAddressSheet>
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
  },
);
