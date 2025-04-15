'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { DatePicker } from '@/components/common/ui/DatePicker';
import { GuestCounter } from '@/components/common/ui/GuestCounter';
import { TimePicker } from '@/components/common/ui/TimePicker';
import useReservationStore, { ReservationStep } from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlertCircle, Calendar, ChevronLeft, Clock, Users2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 날짜/시간 선택 페이지 (1단계)
 */
export default function ReservationDateTimePage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { slug } = params;

  const {
    formData,
    restaurant,
    updateFormData,
    setCurrentStep,
    currentStep,
    isDateTimeValid,
    setRestaurant,
    resetStore,
  } = useReservationStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // 페이지 진입 시 레스토랑 정보 로드
  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // TODO: API 연동
        // const response = await api.dining.getRestaurant(slug);
        // setRestaurant(response.data);

        // 목업 데이터
        const mockRestaurant = {
          id: slug,
          name: '더 다이닝 룸',
          location: '호텔 1층',
          concept: '모던 코리안 다이닝',
          reservationPolicy: {
            minPartySize: 1,
            maxPartySize: 8,
            reservationRequired: true,
            cancellationPolicy: '방문 당일 기준 3시간 전까지 취소 가능',
          },
        };

        setRestaurant(mockRestaurant);

        // 목업 가용 시간 데이터
        const mockAvailableTimes = [
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
          '20:30',
          '21:00',
        ];
        setAvailableTimes(mockAvailableTimes);
      } catch (err) {
        console.error('Failed to load restaurant:', err);
        setError('레스토랑 정보를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurant();
  }, [slug, setRestaurant]);

  // 페이지 진입 시 예약 단계 설정
  useEffect(() => {
    setCurrentStep(ReservationStep.SELECT_DATETIME);
  }, [setCurrentStep]);

  // 이전 단계로 돌아가기
  const handleGoBack = () => {
    router.push(`/dining/${slug}`);
  };

  // 다음 단계로 진행
  const handleNext = () => {
    if (!isDateTimeValid()) {
      setError('날짜, 시간, 인원을 모두 선택해주세요.');
      return;
    }
    // 예약 정보가 모두 유효하면 slug 기반 예약 확인 페이지로 이동
    router.push(`/dining/${slug}/confirmation`);
  };

  // 날짜 선택 핸들러
  const handleDateChange = (date: Date) => {
    updateFormData({ date });
    // 날짜가 변경되면 시간 초기화
    updateFormData({ time: '' });
  };

  // 시간 선택 핸들러
  const handleTimeChange = (time: string) => {
    updateFormData({ time });
  };

  // 인원 수 변경 핸들러
  const handlePartySizeChange = (partySize: number) => {
    updateFormData({ partySize });
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko });
  };

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      resetStore(); // 상태 초기화
    };
  }, [resetStore]);

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-8">
        <div className="text-center py-8">
          <p className="text-gray-600">레스토랑 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-3xl py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" onClick={handleGoBack} className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            레스토랑 페이지로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">날짜 및 시간 선택</h1>
        <p className="text-gray-600">{restaurant?.name} 예약을 위한 날짜와 시간을 선택해주세요.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>예약 정보</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 에러 메시지 */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* 날짜 선택 */}
          <div>
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">날짜 선택</h3>
            </div>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
              locale={ko}
            />
          </div>

          {/* 시간 선택 */}
          {formData.date && (
            <div>
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-medium">시간 선택</h3>
              </div>
              <TimePicker
                availableTimes={availableTimes}
                selectedTime={formData.time}
                onChange={handleTimeChange}
              />
            </div>
          )}

          {/* 인원 수 선택 */}
          <div>
            <div className="flex items-center mb-2">
              <Users2 className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-medium">인원 수</h3>
            </div>
            <GuestCounter
              value={formData.partySize}
              onChange={handlePartySizeChange}
              min={restaurant?.reservationPolicy?.minPartySize || 1}
              max={restaurant?.reservationPolicy?.maxPartySize || 8}
            />
          </div>

          {/* 선택된 정보 요약 */}
          {formData.date && formData.time && formData.partySize > 0 && (
            <div className="bg-slate-50 p-4 rounded-md space-y-2">
              <div className="font-bold text-lg text-slate-900">{restaurant?.name}</div>
              <div className="text-slate-700">날짜: {formatDate(formData.date)}</div>
              <div className="text-slate-700">시간: {formData.time}</div>
              <div className="text-slate-700">인원: {formData.partySize}명</div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack} className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            이전
          </Button>

          <Button onClick={handleNext} disabled={!isDateTimeValid()}>
            다음
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
