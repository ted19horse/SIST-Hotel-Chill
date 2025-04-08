import { create } from 'zustand';

// 예약 단계 열거형
export enum ReservationStep {
  SELECT_DATETIME = 'SELECT_DATETIME',
  ENTER_DETAILS = 'ENTER_DETAILS',
  REVIEW = 'REVIEW',
  CONFIRMATION = 'CONFIRMATION',
  CONFIRMED = 'CONFIRMED',
}

// 예약 폼 데이터 인터페이스
export interface ReservationFormData {
  date: Date | null;
  time: string;
  partySize: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

// 레스토랑 인터페이스
export interface Restaurant {
  id: string;
  name: string;
  location: string;
  concept: string;
  reservationPolicy: {
    minPartySize: number;
    maxPartySize: number;
    reservationRequired: boolean;
    cancellationPolicy: string;
  };
}

// 예약 스토어 인터페이스
interface ReservationStore {
  // 상태
  currentStep: ReservationStep;
  formData: ReservationFormData;
  restaurant: Restaurant | null;
  reservationId: string | null;

  // 액션
  setCurrentStep: (step: ReservationStep) => void;
  updateFormData: (data: Partial<ReservationFormData>) => void;
  setRestaurant: (restaurant: Restaurant) => void;
  setReservationId: (id: string) => void;
  resetStore: () => void;
  resetForm: () => void;

  // 유효성 검사
  isDateTimeValid: () => boolean;
  isDetailsValid: () => boolean;
}

// 초기 상태
const initialState = {
  currentStep: ReservationStep.SELECT_DATETIME,
  formData: {
    date: null,
    time: '',
    partySize: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  },
  restaurant: null,
  reservationId: null,
};

// Zustand 스토어 생성
const useReservationStore = create<ReservationStore>((set, get) => ({
  // 초기 상태
  ...initialState,

  // 액션
  setCurrentStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setRestaurant: (restaurant) => set({ restaurant }),

  setReservationId: (id) => set({ reservationId: id }),

  resetStore: () => set(initialState),

  // resetForm 메서드 - resetStore를 호출하여 스토어 초기화
  resetForm: () => get().resetStore(),

  // 유효성 검사
  isDateTimeValid: () => {
    const { formData } = get();
    return !!(formData.date && formData.time && formData.partySize >= 1);
  },

  isDetailsValid: () => {
    const { formData } = get();
    return !!(formData.name.trim() && formData.email.trim() && formData.phone.trim());
  },
}));

export default useReservationStore;
