import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from '@tanstack/react-router';

export const createWrapper = () => {
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
