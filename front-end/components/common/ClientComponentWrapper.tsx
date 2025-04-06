'use client';

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
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
