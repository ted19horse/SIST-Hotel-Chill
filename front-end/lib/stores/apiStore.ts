import { ApiStatus } from '@/lib/types/api/common';
import { create } from 'zustand';

/**
 * API 상태 관리를 위한 Zustand 스토어 타입
 */
interface ApiState {
  // 상태
  status: Record<string, ApiStatus>; // 'dining/getRestaurants', 'dining/getRestaurant/1' 등
  errors: Record<string, any>;

  // 액션
  setLoading: (key: string) => void;
  setSuccess: (key: string) => void;
  setError: (key: string, error: any) => void;
  resetStatus: (key: string) => void;
  getStatus: (key: string) => ApiStatus;
  getError: (key: string) => any;
  isLoading: (key: string) => boolean;
  isSuccess: (key: string) => boolean;
  isError: (key: string) => boolean;
}

/**
 * API 상태 관리 스토어
 */
export const useApiStore = create<ApiState>((set, get) => ({
  // 상태
  status: {},
  errors: {},

  // 액션
  setLoading: (key: string) =>
    set((state) => ({
      status: {
        ...state.status,
        [key]: ApiStatus.LOADING,
      },
      errors: {
        ...state.errors,
        [key]: null,
      },
    })),

  setSuccess: (key: string) =>
    set((state) => ({
      status: {
        ...state.status,
        [key]: ApiStatus.SUCCESS,
      },
    })),

  setError: (key: string, error: any) =>
    set((state) => ({
      status: {
        ...state.status,
        [key]: ApiStatus.ERROR,
      },
      errors: {
        ...state.errors,
        [key]: error,
      },
    })),

  resetStatus: (key: string) =>
    set((state) => {
      const newStatus = { ...state.status };
      const newErrors = { ...state.errors };
      delete newStatus[key];
      delete newErrors[key];
      return {
        status: newStatus,
        errors: newErrors,
      };
    }),

  getStatus: (key: string) => get().status[key] || ApiStatus.IDLE,

  getError: (key: string) => get().errors[key] || null,

  isLoading: (key: string) => get().getStatus(key) === ApiStatus.LOADING,

  isSuccess: (key: string) => get().getStatus(key) === ApiStatus.SUCCESS,

  isError: (key: string) => get().getStatus(key) === ApiStatus.ERROR,
}));
