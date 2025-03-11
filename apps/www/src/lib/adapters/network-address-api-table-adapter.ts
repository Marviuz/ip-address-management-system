import type { NetworkAddressListSchema } from '@ip-address-management-system/shared';
import type { NetworkAddressTableColumns } from '@/features/network-address-data-table/components/columns';

export function networkAddressApiTableAdapter(
  items: NetworkAddressListSchema['items'],
): NetworkAddressTableColumns[] {
  return items.map((item) => ({
    address: item.networkAddress,
    label: item.label,
    comments: item.comments,
    addressId: item.publicId,
    addedAt: item.createdAt,
    modifiedAt: item.updatedAt,
  }));
}
