import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { createWrapper } from './test-utils';
import {
  useAllAuditLogs,
  useAuditLogByPublicId,
} from './use-audit-log-queries';

describe('useAuditLogQueries', () => {
  it('should return audit logs', async () => {
    const page = 1;
    const pageSize = 10;

    const { result } = renderHook(() => useAllAuditLogs({ page, pageSize }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});

describe('useAuditLogByPublicId', () => {
  it('should return audit logs', async () => {
    const publicId = '123';

    const { result } = renderHook(() => useAuditLogByPublicId({ publicId }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });
});
