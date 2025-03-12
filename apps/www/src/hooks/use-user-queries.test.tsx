import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from '@tanstack/react-router';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useNetworkAddresses } from './use-network-address-queries';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return wrapper;
};

describe('useNetworkAddresses', () => {
  it('should return the network addresses', async () => {
    const page = 1;
    const pageSize = 10;

    const { result } = renderHook(
      () => useNetworkAddresses({ page, pageSize }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
