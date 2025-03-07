import type { NetworkAddressSchema } from '@ip-address-management-system/shared';
import type { NetworkAddressTableColumns } from '@/features/network-address-data-table/components/columns';

export function NetworkAddressApiTableAdapter(
  items: NetworkAddressSchema[],
): NetworkAddressTableColumns[] {
  return items.map((item) => ({
    address: item.networkAddress,
    label: item.label,
    comments: item.comments,
    addressId: item.publicId,
  }));
}
