import { http } from 'msw';
import { networkAddressListSchema } from '@ip-address-management-system/shared';
import { generateMock } from '@anatine/zod-mock';

export const handlers = [
  http.get('*/network-address', () => {
    return Response.json(generateMock(networkAddressListSchema));
  }),
];
