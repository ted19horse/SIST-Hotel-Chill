'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { Textarea } from '@/components/common/ui/Textarea';
import useReservationStore, { ReservationStep } from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 예약 세부 정보 입력 페이지 (2단계)
 */
export default function ReservationDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get('restaurantId');

  const {
    formData,
    restaurant,
    updateFormData,
    setCurrentStep,
    currentStep,
    isDetailsValid,
    setReservationId,
    setRestaurant,
  } = useReservationStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // 페이지 진입 시 레스토랑 정보 로드
  useEffect(() => {
    const loadRestaurant = async () => {
      // restaurantId가 없어도 formData에서 restaurant 정보를 사용할 수 있도록 수정
      if (!restaurantId && !restaurant?.id) {
        setError('예약 정보가 없습니다.');
        router.push('/dining');
        return;
      }

      // 이미 레스토랑 정보가 있다면 다시 로드하지 않음
      if (restaurant?.id === restaurantId) {
        return;
      }

      try {
        // TODO: API 연동
        // const response = await api.dining.getRestaurant(restaurantId);
        // setRestaurant(response.data);

        // 목업 데이터
        const mockRestaurant = {
          id: restaurantId || restaurant?.id,
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
      } catch (err) {
        console.error('Failed to load restaurant:', err);
        setError('레스토랑 정보를 불러오는데 실패했습니다.');
      }
    };

    loadRestaurant();
  }, [restaurantId, router, setRestaurant, restaurant]);

  // 페이지 진입 시 예약 단계 확인 및 데이터 유효성 검증
  useEffect(() => {
    // 레스토랑 정보가 로드된 후에만 유효성 검사 수행
    if (restaurant) {
      // 날짜/시간 선택을 건너뛰고 이 페이지에 접근한 경우 처리
      if (!formData.date || !formData.time || formData.partySize < 1) {
        setCurrentStep(ReservationStep.SELECT_DATETIME);
        router.push(`/dining/${restaurant.id}/reserve`);
        return;
      }

      // 현재 단계를 세부 정보 입력으로 설정
      setCurrentStep(ReservationStep.ENTER_DETAILS);
    }
  }, [formData, restaurant, setCurrentStep, router]);

  // 이전 단계로 돌아가기
  const handleGoBack = () => {
    if (restaurant?.id) {
      setCurrentStep(ReservationStep.SELECT_DATETIME);
      router.push(`/dining/${restaurant.id}/reserve`);
    } else {
      router.push('/dining');
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  // 다음 단계로 진행
  const handleSubmit = async () => {
    if (!isDetailsValid()) {
      setError('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // API 호출 (실제로는 예약 생성 API 연동 필요)
      // const response = await api.dining.createReservation(formData);
      // const reservationId = response.data.id;

      // 목업 데이터로 예약 ID 생성
      const mockReservationId = `RES-${Date.now().toString().substr(-6)}`;
      setReservationId(mockReservationId);

      // 성공 메시지 표시 후 다음 단계로 이동
      setShowSuccess(true);

      setTimeout(() => {
        setCurrentStep(ReservationStep.REVIEW);
        router.push('/dining/reserve/confirmation');
      }, 1500);
    } catch (err) {
      console.error('Failed to create reservation:', err);
      setError('예약 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 날짜 포맷팅
  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko });
  };

  // 시간 포맷팅
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}:${minutes}`;
  };

  if (!restaurant || !formData.date || !formData.time) {
    return null; // useEffect에서 리다이렉트 처리
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">예약 세부 정보</h1>
        <p className="text-gray-600">레스토랑 예약을 위한 정보를 입력해주세요.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>예약 정보 확인</CardTitle>
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
                예약 정보가 저장되었습니다. 확인 페이지로 이동합니다.
              </AlertDescription>
            </Alert>
          )}

          {/* 날짜/시간 선택 안내 */}
          {!formData.date || !formData.time || formData.partySize < 1 ? (
            <div className="text-center py-6">
              <p className="text-gray-600 mb-4">예약을 위해 날짜와 시간을 선택해주세요.</p>
              <Button onClick={() => router.push(`/dining/${restaurant?.id || ''}`)}>
                날짜/시간 선택하기
              </Button>
            </div>
          ) : (
            <>
              {/* 예약 요약 정보 */}
              <div className="bg-slate-50 p-4 rounded-md space-y-2">
                <div className="font-bold text-lg text-slate-900">{restaurant.name}</div>
                <div className="text-slate-700">날짜: {formatDate(formData.date)}</div>
                <div className="text-slate-700">시간: {formatTime(formData.time)}</div>
                <div className="text-slate-700">인원: {formData.partySize}명</div>
              </div>

              {/* 예약자 정보 */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">예약자 이름 *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="예약자 이름을 입력해주세요"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">이메일 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="예약 확인을 위한 이메일을 입력해주세요"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="000-0000-0000"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests">요청사항</Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests || ''}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      placeholder="알레르기, 선호하는 좌석 등 특별 요청사항이 있으면 입력해주세요"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack} className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            이전
          </Button>

          {formData.date && formData.time && formData.partySize > 0 && (
            <Button onClick={handleSubmit} disabled={!isDetailsValid() || isSubmitting}>
              {isSubmitting ? '처리 중...' : '예약 확인하기'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
