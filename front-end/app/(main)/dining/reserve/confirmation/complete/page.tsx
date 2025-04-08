'use client';

import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/common/ui/Card';
import useReservationStore from '@/lib/stores/reservationStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar, CheckCircle, Clock, MapPin, Users2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 예약 완료 페이지
 * 백엔드 연동 없이 임시로 예약 완료 메시지를 보여주는 페이지
 */
export default function ReservationCompletePage() {
  const router = useRouter();
  const { formData, restaurant, reservationId, resetForm } = useReservationStore();

  // 페이지 진입 시 예약 정보 유효성 확인
  useEffect(() => {
    // 필수 예약 정보가 없는 경우 홈으로 리다이렉트
    if (!formData.date || !formData.time || !formData.name || !reservationId || !restaurant) {
      router.push('/dining');
      return;
    }
  }, [formData, reservationId, restaurant, router]);

  // 예약 정보 초기화 (예약 완료 후 5초 후에 초기화)
  useEffect(() => {
    const timer = setTimeout(() => {
      // 예약 정보 초기화
      resetForm();
    }, 5000);

    return () => clearTimeout(timer);
  }, [resetForm]);

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

  // 예약 정보가 없는 경우 로딩 상태 표시
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
                    <p>{formatDate(formData.date)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">시간</p>
                    <p>{formatTime(formData.time)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users2 className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">인원</p>
                    <p>{formData.partySize}명</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">위치</p>
                    <p>{restaurant.location}</p>
                  </div>
                </div>
              </div>

              {/* 예약자 정보 */}
              <div className="border-t pt-3 mt-2">
                <p className="text-sm text-gray-500 mb-2">예약자 정보</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">이름</p>
                    <p className="font-medium">{formData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">연락처</p>
                    <p className="font-medium">{formData.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">이메일</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 안내 메시지 */}
            <div className="text-sm text-gray-500 mt-4">
              <p>예약 확인 이메일이 {formData.email}로 발송되었습니다.</p>
              <p className="mt-1">
                예약과 관련하여 궁금한 점이 있으시면 고객센터(02-1234-5678)로 문의해주세요.
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
          <Link href="/dining">
            <Button variant="outline">다이닝 홈으로</Button>
          </Link>
          <Link href="/my-account/reservations">
            <Button>예약 관리</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
