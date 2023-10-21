'use client';

import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
};

export default QueryClientProvider;
