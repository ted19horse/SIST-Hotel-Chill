import { ReservationFormData, ReservationStep } from '@/lib/types/reservation';
import { Restaurant } from '@/lib/types/restaurant';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

/**
 * 예약 상태 스토어 타입
 */
interface ReservationState {
  // 예약 상태
  currentStep: ReservationStep;
  restaurant: Restaurant | null;
  formData: ReservationFormData;
  isSubmitting: boolean;
  error: string | null;
  reservationId: string | null;

  // 유효성 검증 함수
  isDateTimeValid: () => boolean;
  isDetailsValid: () => boolean;

  // 액션
  setCurrentStep: (step: ReservationStep) => void;
  setRestaurant: (restaurant: Restaurant) => void;
  updateFormData: (data: Partial<ReservationFormData>) => void;
  resetForm: () => void;
  setError: (error: string | null) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setReservationId: (id: string) => void;
}

/**
 * 예약 상태 관리 스토어 (Zustand)
 */
export const useReservationStore = create<ReservationState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        currentStep: ReservationStep.SELECT_DATETIME,
        restaurant: null,
        formData: {
          restaurantId: '',
          date: new Date(),
          time: '',
          partySize: 2,
          name: '',
          email: '',
          phone: '',
          specialRequests: '',
          isAgreedToPolicy: false,
        },
        isSubmitting: false,
        error: null,
        reservationId: null,

        // 날짜 및 시간 선택 유효성 검증
        isDateTimeValid: () => {
          const { formData } = get();
          return (
            !!formData.restaurantId && !!formData.date && !!formData.time && formData.partySize > 0
          );
        },

        // 상세 정보 유효성 검증
        isDetailsValid: () => {
          const { formData } = get();
          return (
            !!formData.name && !!formData.email && !!formData.phone && !!formData.isAgreedToPolicy
          );
        },

        // 현재 단계 설정
        setCurrentStep: (step: ReservationStep) => set({ currentStep: step }),

        // 레스토랑 설정
        setRestaurant: (restaurant: Restaurant) =>
          set({
            restaurant,
            formData: {
              ...get().formData,
              restaurantId: restaurant.id,
            },
          }),

        // 폼 데이터 업데이트
        updateFormData: (data: Partial<ReservationFormData>) =>
          set({
            formData: { ...get().formData, ...data },
          }),

        // 폼 초기화
        resetForm: () =>
          set({
            formData: {
              restaurantId: '',
              date: new Date(),
              time: '',
              partySize: 2,
              name: '',
              email: '',
              phone: '',
              specialRequests: '',
              isAgreedToPolicy: false,
            },
            currentStep: ReservationStep.SELECT_DATETIME,
            error: null,
            isSubmitting: false,
            reservationId: null,
          }),

        // 에러 설정
        setError: (error: string | null) => set({ error }),

        // 제출 중 상태 설정
        setIsSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),

        // 예약 ID 설정
        setReservationId: (id: string) => set({ reservationId: id }),
      }),
      {
        name: 'reservation-storage',
        partialize: (state) => ({
          formData: state.formData,
          restaurant: state.restaurant,
          reservationId: state.reservationId,
        }),
      }
    )
  )
);

export { ReservationStep };

export default useReservationStore;
