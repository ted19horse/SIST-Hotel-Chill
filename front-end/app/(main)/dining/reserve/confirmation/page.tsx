'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { ReservationStep, useReservationStore } from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Clock,
  MapPin,
  Users2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 예약 확인 페이지 (3단계)
 */
export default function ReservationConfirmationPage() {
  const router = useRouter();
  const { formData, restaurant, currentStep, reservationId, setCurrentStep, resetForm } =
    useReservationStore();

  const [error, setError] = useState<string | null>(null);

  // 페이지 진입 시 예약 단계 확인 및 데이터 유효성 검증
  useEffect(() => {
    // 예약 정보 입력 단계를 건너뛰고 접근한 경우 처리
    if (
      !formData.date ||
      !formData.time ||
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !restaurant
    ) {
      setCurrentStep(ReservationStep.ENTER_DETAILS);
      router.push('/dining/reserve');
      return;
    }

    // 예약 ID가 없는 경우 처리 (직접 URL 접근 등)
    if (!reservationId) {
      setError('유효하지 않은 예약입니다. 다시 시도해주세요.');
      return;
    }

    // 현재 단계를 확인 단계로 설정
    setCurrentStep(ReservationStep.REVIEW);
  }, [formData, restaurant, reservationId, setCurrentStep, router]);

  // 이전 단계로 돌아가기
  const handleGoBack = () => {
    setCurrentStep(ReservationStep.ENTER_DETAILS);
    router.push('/dining/reserve');
  };

  // 예약 완료
  const handleConfirm = () => {
    setCurrentStep(ReservationStep.CONFIRMED);

    // 예약 완료 후 메인 페이지로 리다이렉트 (실제로는 예약 완료 페이지를 보여주거나 마이페이지로 이동)
    // 일정 시간 후 폼 상태 초기화
    setTimeout(() => {
      resetForm();
    }, 3000);
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

  if (!restaurant || !formData.date || !formData.time || !reservationId) {
    return (
      <div className="container max-w-3xl py-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  if (currentStep === ReservationStep.CONFIRMED) {
    return (
      <div className="container max-w-3xl py-8">
        <Card className="shadow-md">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">예약이 완료되었습니다</h2>
              <p className="text-gray-600 max-w-md">
                {restaurant.name}에 {formatDate(formData.date)}에 예약이 완료되었습니다. 예약 번호는{' '}
                <span className="font-bold">{reservationId}</span>입니다.
              </p>
              <p className="text-sm text-gray-500">
                예약 확인 이메일이 {formData.email}로 발송되었습니다.
              </p>
              <div className="mt-6">
                <Link href="/dining">
                  <Button>다이닝 페이지로 돌아가기</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">예약 확인</h1>
        <p className="text-gray-600">예약 정보를 확인하고 예약을 완료해주세요.</p>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>예약 정보</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 레스토랑 정보 */}
          <div className="bg-slate-50 p-4 rounded-md mb-4">
            <h3 className="text-lg font-bold mb-2">{restaurant.name}</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{restaurant.location}</span>
            </div>
            <p className="text-sm text-gray-600">{restaurant.concept}</p>
          </div>

          {/* 예약 정보 */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4 border-b pb-4">
              <div className="bg-primary/10 p-2 rounded">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">날짜</div>
                <div className="font-medium">{formatDate(formData.date)}</div>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-b pb-4">
              <div className="bg-primary/10 p-2 rounded">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">시간</div>
                <div className="font-medium">{formatTime(formData.time)}</div>
              </div>
            </div>

            <div className="flex items-start space-x-4 border-b pb-4">
              <div className="bg-primary/10 p-2 rounded">
                <Users2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-gray-500">인원</div>
                <div className="font-medium">{formData.partySize}명</div>
              </div>
            </div>
          </div>

          {/* 예약자 정보 */}
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">예약자 정보</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">예약자 이름</div>
                <div className="font-medium">{formData.name}</div>
              </div>
              <div>
                <div className="text-gray-500">연락처</div>
                <div className="font-medium">{formData.phone}</div>
              </div>
              <div className="col-span-2">
                <div className="text-gray-500">이메일</div>
                <div className="font-medium">{formData.email}</div>
              </div>
              {formData.specialRequests && (
                <div className="col-span-2">
                  <div className="text-gray-500">요청사항</div>
                  <div className="font-medium">{formData.specialRequests}</div>
                </div>
              )}
            </div>
          </div>

          {/* 예약 안내 */}
          <div className="bg-blue-50 p-4 rounded-md text-blue-700 text-sm">
            <p className="font-medium mb-2">예약 안내</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>예약 취소는 방문 당일 기준 3시간 전까지 가능합니다.</li>
              <li>예약 시간 15분 경과 시 예약이 자동 취소될 수 있습니다.</li>
              <li>문의사항은 고객센터(02-1234-5678)로 연락해주세요.</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack} className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            이전
          </Button>

          <Button onClick={handleConfirm}>예약 완료하기</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
