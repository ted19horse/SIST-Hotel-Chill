'use client';

import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';
import { ReactNode, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

/**
 * ClientComponentWrapper 컴포넌트의 속성을 정의하는 인터페이스
 * @interface ClientComponentWrapperProps
 * @property {ReactNode} children - 래핑할 자식 컴포넌트들
 * @property {ReactNode} [fallback] - 로딩 중에 표시할 대체 컴포넌트 (선택적)
 */
interface ClientComponentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 클라이언트 컴포넌트를 위한 래퍼 컴포넌트
 *
 * 이 컴포넌트는 다음과 같은 기능을 제공합니다:
 * 1. 'use client' 지시문을 사용하여 클라이언트 사이드 렌더링을 활성화합니다.
 * 2. ReactQuery 기능을 제공하기 위해 ReactQueryProvider로 자식 컴포넌트를 감쌉니다.
 * 3. React의 Suspense를 사용하여 비동기 로딩 상태를 처리합니다.
 *
 * @param {ClientComponentWrapperProps} props - 컴포넌트 속성
 * @param {ReactNode} props.children - 래핑할 자식 컴포넌트들
 * @param {ReactNode} [props.fallback=<LoadingSpinner />] - 로딩 중에 표시할 대체 컴포넌트, 기본값은 LoadingSpinner 컴포넌트
 * @returns {JSX.Element} 래핑된 클라이언트 컴포넌트
 *
 * @example
 * // 기본 사용법
 * <ClientComponentWrapper>
 *   <YourClientComponent />
 * </ClientComponentWrapper>
 *
 * @example
 * // 커스텀 로딩 컴포넌트 사용
 * <ClientComponentWrapper fallback={<CustomLoader />}>
 *   <YourClientComponent />
 * </ClientComponentWrapper>
 */
export default function ClientComponentWrapper({
  children,
  fallback = <LoadingSpinner />,
}: ClientComponentWrapperProps) {
  return (
    <ReactQueryProvider>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ReactQueryProvider>
  );
}
