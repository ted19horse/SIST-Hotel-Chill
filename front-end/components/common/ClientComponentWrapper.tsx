'use client';

import { ReactQueryProvider } from '@/lib/providers/ReactQueryProvider';
import { ReactNode, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ClientComponentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

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
