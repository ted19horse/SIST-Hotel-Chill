'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { ReservationStep, useReservationStore } from '@/lib/stores/reservationStore';
import { Restaurant } from '@/lib/types/dining/restaurant';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DatePicker } from './DatePicker';
import { GuestCounter } from './GuestCounter';
import { TimePicker } from './TimePicker';

interface ReservationFormProps {
  restaurant: Restaurant;
}

/**
 * 다이닝 예약 폼 컴포넌트 (1단계: 날짜 및 시간 선택)
 */
export function ReservationForm({ restaurant }: ReservationFormProps) {
  const router = useRouter();
  const { formData, updateFormData, setRestaurant, setCurrentStep, isDateTimeValid, resetForm } =
    useReservationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // 컴포넌트 마운트 시 레스토랑 정보 설정
  useEffect(() => {
    // 새로운 예약 시작 시 이전 폼 초기화
    resetForm();

    // 레스토랑 정보 설정
    setRestaurant(restaurant);
  }, [restaurant, setRestaurant, resetForm]);

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date) => {
    updateFormData({ date, time: null });
  };

  // 시간 변경 핸들러
  const handleTimeChange = (time: string | null) => {
    updateFormData({ time });
  };

  // 인원 수 변경 핸들러
  const handleGuestCountChange = (value: number) => {
    updateFormData({ partySize: value });
  };

  // 폼 제출 핸들러
  const handleSubmit = async () => {
    if (!isDateTimeValid()) {
      setError('날짜, 시간, 인원 수를 모두 선택해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // 예약 가능 여부 확인 API 호출 (실제로는 API 연동 필요)
      // 이 단계에서는 선택한 값을 저장하고 다음 단계로 진행

      // 성공 메시지 표시 후 다음 단계로 이동
      setShowSuccess(true);

      setTimeout(() => {
        // 다음 단계로 이동
        setCurrentStep(ReservationStep.ENTER_DETAILS);
        router.push('/dining/reserve');
      }, 1500);
    } catch (err) {
      console.error('Failed to proceed with reservation:', err);
      setError('예약 진행 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>레스토랑 예약</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 에러 메시지 */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 성공 메시지 */}
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription className="text-green-700">
              입력한 정보가 저장되었습니다. 예약 세부 정보 입력 페이지로 이동합니다.
            </AlertDescription>
          </Alert>
        )}

        {/* 레스토랑 정보 */}
        <div className="bg-slate-50 p-3 rounded-md">
          <h3 className="font-bold text-lg">{restaurant.name}</h3>
          <p className="text-sm text-gray-600">{restaurant.location}</p>
        </div>

        {/* 날짜 선택 */}
        <DatePicker
          selectedDate={formData.date}
          onSelectDate={handleDateChange}
          label="방문 날짜"
        />

        {/* 시간 선택 */}
        <TimePicker
          restaurantId={restaurant.id}
          selectedDate={formData.date}
          selectedTime={formData.time}
          partySize={formData.partySize}
          onSelectTime={handleTimeChange}
          label="방문 시간"
        />

        {/* 인원 수 선택 */}
        <GuestCounter
          value={formData.partySize}
          onChange={handleGuestCountChange}
          min={1}
          max={restaurant.capacity?.total || 10}
          label="인원 수"
        />
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!isDateTimeValid() || isSubmitting}
          className="px-6"
        >
          {isSubmitting ? '처리 중...' : '다음 단계'}
        </Button>
      </CardFooter>
    </Card>
  );
}
