export type CreateNetworkAddressPayload = {
  networkAddress: string;
  label: string;
  comments?: string | null;
};

export type UpdateNetworkAddressPayload = Partial<CreateNetworkAddressPayload>;

export type DeleteNetworkAddressPayload = {
  ids: string[];
};
