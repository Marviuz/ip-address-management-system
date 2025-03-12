import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createWrapper } from './test-utils';
import { useAuthedUser, useSuspenseAuthedUser } from './use-user-queries';

describe('useAuthedUser', () => {
  it('should return currently logged in user', async () => {
    const { result } = renderHook(() => useAuthedUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });

  it('should return currently logged in user (suspense)', async () => {
    const { result } = renderHook(() => useSuspenseAuthedUser(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
