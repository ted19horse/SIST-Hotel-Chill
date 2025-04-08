'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

/**
 * React Query 프로바이더 컴포넌트
 * 애플리케이션에서 React Query를 사용하기 위한 설정을 제공합니다.
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  // 클라이언트 컴포넌트에서 QueryClient 인스턴스를 생성하기 위해 useState 사용
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1분
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
