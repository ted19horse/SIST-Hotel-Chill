// 예약 완료(성공) 페이지 (레스토랑별)
// 기존 /dining/reserve/confirmation/complete/page.tsx 코드 기반, 경로 및 라우팅 slug 기반으로 수정

'use client';

import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/common/ui/Card';
import useReservationStore from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, CheckCircle, Clock, MapPin, Users2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 예약 완료(성공) 페이지
 *
 * 예약이 정상적으로 완료된 후 보여지는 페이지입니다.
 * useParams()로 slug를 받아서, 레스토랑별로 동작하도록 구성합니다.
 */
export default function ReservationCompletePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { formData, restaurant, reservationId, resetForm } = useReservationStore();

  // 페이지 진입 시 예약 정보 유효성 확인
  useEffect(() => {
    if (!formData.date || !formData.time || !formData.name || !reservationId || !restaurant) {
      router.push(`/dining/${slug}`);
      return;
    }
  }, [formData, reservationId, restaurant, router, slug]);

  // 예약 정보 초기화 (예약 완료 후 5초 후에 초기화)
  useEffect(() => {
    const timer = setTimeout(() => {
      resetForm();
    }, 5000);
    return () => clearTimeout(timer);
  }, [resetForm]);

  // 날짜/시간 포맷 함수
  const formatDate = (date: Date) => format(date, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko });
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}:${minutes}`;
  };

  if (!formData.date || !formData.time || !formData.name || !reservationId || !restaurant) {
    return (
      <div className="container max-w-3xl py-12 text-center">
        <p className="text-gray-500">예약 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-12">
      <Card className="shadow-md">
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center justify-center text-center space-y-6">
            {/* 성공 아이콘 */}
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            {/* 예약 완료 메시지 */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">예약이 완료되었습니다!</h1>
              <p className="text-gray-600 max-w-md">
                고객님의 예약이 성공적으로 접수되었습니다. 아래 예약 정보를 확인해주세요.
              </p>
            </div>
            {/* 예약 정보 카드 */}
            <div className="w-full max-w-md bg-slate-50 rounded-lg p-6 mt-4 space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="font-bold text-lg">{restaurant.name}</h2>
                <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                  예약 확정
                </span>
              </div>
              {/* 예약 번호 */}
              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">예약 번호</p>
                <p className="font-bold">{reservationId}</p>
              </div>
              {/* 예약 상세 정보 */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">날짜</p>
                    <p className="font-bold">{typeof formData.date === 'string' ? formData.date : formatDate(formData.date)}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">시간</p>
                    <p className="font-bold">{formatTime(formData.time)}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">인원</p>
                    {/* <p className="font-bold">{formData.party || '-'}명</p> */}
                    <p className="font-bold">{'-'}명</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">연락처</p>
                    <p className="font-bold">{formData.phone}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="inline-block w-5" />
                  <div>
                    <p className="text-sm text-gray-500">이메일</p>
                    <p className="font-bold">{formData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline">
            <Link href={`/dining/${slug}`}>레스토랑으로 돌아가기</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
