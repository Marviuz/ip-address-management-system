import { http } from 'msw';
import {
  auditLogsListSchema,
  auditLogsSchema,
  networkAddressListSchema,
  networkAddressSchema,
  userSchema,
} from '@ip-address-management-system/shared';
import { generateMock } from '@anatine/zod-mock';

export const handlers = [
  http.get('*/users/me', () => {
    return Response.json(generateMock(userSchema));
  }),
  http.get('*/network-address', () => {
    return Response.json(generateMock(networkAddressListSchema));
  }),
  http.get('*/network-address/:publicId', () => {
    return Response.json(generateMock(networkAddressSchema));
  }),
  http.get('*/audit-logs', () => {
    return Response.json(generateMock(auditLogsListSchema, { seed: 1 }));
  }),
  http.get('*/audit-logs/:publicId', () => {
    return Response.json(generateMock(auditLogsSchema, { seed: 1 }));
  }),
];
