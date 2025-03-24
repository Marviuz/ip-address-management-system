import { type NetworkType, type Role } from './consts';

export type GetNetworkAddressesListPayload = Partial<{
  page: number;
  pageSize: number;
  q: string;
  type: NetworkType;
}>;

export type GetAuditLogsListPayload = Partial<{
  page: number;
  pageSize: number;
  q: string;
}>;

export type CreateNetworkAddressPayload = {
  networkAddress: string;
  label: string;
  comments?: string | null;
};

export type UpdateNetworkAddressPayload = Partial<CreateNetworkAddressPayload>;

export type DeleteNetworkAddressPayload = {
  ids: string[];
};

export type CreateUserPayload = {
  email: string;
  password: string;
  role: Role;
  givenName: string;
  username?: string | null | undefined;
  familyName?: string | null | undefined;
};
