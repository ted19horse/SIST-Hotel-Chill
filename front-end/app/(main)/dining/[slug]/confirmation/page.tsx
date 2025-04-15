// 예약 확인 페이지 (레스토랑별)
// 기존 /dining/reserve/confirmation/page.tsx 코드 기반, 경로 및 라우팅 slug 기반으로 수정

'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { ReservationStep, useReservationStore } from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlertCircle, Calendar, CheckCircle, ChevronLeft, Clock, MapPin, Users2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * 예약 확인 페이지
 *
 * 예약 정보를 최종 확인하고, 예약 완료로 이동하는 역할을 합니다.
 * useParams()로 slug를 받아서, 레스토랑별로 동작하도록 구성합니다.
 */
export default function ReservationConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { formData, restaurant, currentStep, reservationId, setCurrentStep, resetForm } = useReservationStore();
  const [error, setError] = useState<string | null>(null);

  // 예약 정보 유효성 검증
  useEffect(() => {
    if (!formData.date || !formData.time || !formData.name || !formData.email || !formData.phone || !restaurant) {
      setCurrentStep(ReservationStep.ENTER_DETAILS);
      router.push(`/dining/${slug}/reserve`);
      return;
    }
    if (!reservationId) {
      setError('유효하지 않은 예약입니다. 다시 시도해주세요.');
      return;
    }
    setCurrentStep(ReservationStep.REVIEW);
  }, [formData, restaurant, reservationId, setCurrentStep, router, slug]);

  // 이전 단계로 돌아가기
  const handleGoBack = () => {
    setCurrentStep(ReservationStep.ENTER_DETAILS);
    router.push(`/dining/${slug}/reserve`);
  };

  // 예약 완료
  const handleConfirm = () => {
    setCurrentStep(ReservationStep.CONFIRMED);
    router.push(`/dining/${slug}/confirmation/complete`);
  };

  // 날짜/시간 포맷 함수
  const formatDate = (date: Date) => format(date, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko });
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
        <Alert variant="success">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>예약이 완료되었습니다!</AlertDescription>
        </Alert>
        <Link href={`/dining/${slug}/confirmation/complete`} className="block mt-4">
          예약 완료 페이지로 이동
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>예약 정보 확인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 예약 정보 표시 */}
          <div className="space-y-2">
            <div className="font-bold">{restaurant.name}</div>
            <div>예약자: {formData.name}</div>
            <div>날짜: {typeof formData.date === 'string' ? formData.date : formatDate(formData.date)}</div>
            <div>시간: {formatTime(formData.time)}</div>
            <div>인원: {formData.party || '-'}명</div>
            <div>연락처: {formData.phone}</div>
            <div>이메일: {formData.email}</div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Button variant="outline" onClick={handleGoBack}>
            <ChevronLeft className="w-4 h-4 mr-1" /> 이전 단계
          </Button>
          <Button onClick={handleConfirm}>
            예약 확정
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
