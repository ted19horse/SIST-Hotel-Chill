import { useApiStore } from '@/lib/stores/apiStore';
import { ApiStatus } from '@/types/api/common';
import { useCallback, useEffect, useState } from 'react';

/**
 * API 호출 훅 반환 타입
 */
interface UseApiResult<T> {
  data: T | null;
  status: ApiStatus;
  error: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  execute: (...args: any[]) => Promise<T>;
  reset: () => void;
}

/**
 * API 호출을 관리하는 커스텀 훅
 * @param key API 호출을 식별하는 고유 키
 * @param apiFunction API 호출 함수
 * @param initialData 초기 데이터 (선택사항)
 * @param executeOnMount 컴포넌트 마운트 시 자동 실행 여부 (기본값: false)
 * @param executeArgs 자동 실행 시 인자 (선택사항)
 * @returns API 호출 상태 및 제어 함수
 */
export function useApi<T>(
  key: string,
  apiFunction: (...args: any[]) => Promise<T>,
  initialData: T | null = null,
  executeOnMount: boolean = false,
  executeArgs: any[] = []
): UseApiResult<T> {
  // API 스토어에서 상태 관리 함수들 가져오기
  const {
    getStatus,
    getError,
    setLoading,
    setSuccess,
    setError,
    resetStatus,
    isLoading,
    isSuccess,
    isError,
  } = useApiStore();

  // 데이터 상태 (Zustand에서 관리하지 않음)
  const [data, setData] = useState<T | null>(initialData);

  // API 호출 함수
  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setLoading(key);
        const response = await apiFunction(...args);
        setData(response);
        setSuccess(key);
        return response;
      } catch (error) {
        setError(key, error);
        throw error;
      }
    },
    [apiFunction, key, setLoading, setSuccess, setError]
  );

  // 상태 초기화 함수
  const reset = useCallback(() => {
    resetStatus(key);
    setData(initialData);
  }, [key, initialData, resetStatus]);

  // 컴포넌트 마운트 시 자동 실행
  useEffect(() => {
    if (executeOnMount) {
      execute(...executeArgs).catch(console.error);
    }

    // 컴포넌트 언마운트 시 상태 정리
    return () => {
      resetStatus(key);
    };
  }, [executeOnMount, execute, executeArgs, key, resetStatus]);

  return {
    data,
    status: getStatus(key),
    error: getError(key),
    isLoading: isLoading(key),
    isSuccess: isSuccess(key),
    isError: isError(key),
    execute,
    reset,
  };
}
