import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createWrapper } from './test-utils';
import {
  useNetworkAddressByPublicId,
  useSuspenseNetworkAddresses,
} from './use-network-address-queries';

describe('useNetworkAddresses', () => {
  it('should return the network addresses', async () => {
    const page = 1;
    const pageSize = 10;

    const { result } = renderHook(
      () => useSuspenseNetworkAddresses({ page, pageSize }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});

describe('useNetworkAddressByPublicId', () => {
  it('should return the network address by public id', async () => {
    const publicId = '123';
    const { result } = renderHook(
      () => useNetworkAddressByPublicId({ publicId }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
