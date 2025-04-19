'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState, memo } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
}

/**
 * React Query 프로바이더 컴포넌트
 * 
 * 최적화 내용:
 * 1. 메모이제이션을 통한 불필요한 리렌더링 방지
 * 2. 캐싱 설정 최적화
 * 3. 에러 처리 강화
 * 
 * @param {ReactQueryProviderProps} props - 컴포넌트 속성
 * @returns {JSX.Element} 메모이제이션된 프로바이더 컴포넌트
 */
export const ReactQueryProvider = memo(function ReactQueryProvider({ 
  children 
}: ReactQueryProviderProps) {
  // 클라이언트 컴포넌트에서 QueryClient 인스턴스를 생성하기 위해 useState 사용
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5분으로 증가하여 불필요한 재요청 감소
          cacheTime: 10 * 60 * 1000, // 10분 캐시 유지
          refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
          refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
          retry: 1, // 실패 시 재시도 횟수 제한
          retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프 사용
        },
        mutations: {
          retry: 1, // 변경 작업 실패 시 재시도 횟수 제한
          retryDelay: 1000, // 변경 작업 재시도 지연 시간
        },
      },
    })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
});
