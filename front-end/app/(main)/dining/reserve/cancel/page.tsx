'use client';

import { Alert, AlertDescription } from '@/components/common/ui/Alert';
import { Button } from '@/components/common/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/common/ui/Card';
import { Input } from '@/components/common/ui/Input';
import { Label } from '@/components/common/ui/Label';
import { AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 * 예약 검색 폼 인터페이스
 */
interface ReservationSearchForm {
  reservationId: string;
  email: string;
}

/**
 * 예약 취소 페이지
 */
export default function ReservationCancelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ReservationSearchForm>({
    reservationId: '',
    email: '',
  });

  const [isSearching, setIsSearching] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [foundReservation, setFoundReservation] = useState<any | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  /**
   * 입력 필드 변경 핸들러
   */
  const handleInputChange = (field: keyof ReservationSearchForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 예약 검색 핸들러
   */
  const handleSearch = async () => {
    if (!formData.reservationId || !formData.email) {
      setError('예약 번호와 이메일을 모두 입력해주세요.');
      return;
    }

    try {
      setIsSearching(true);
      setError(null);

      // TODO: API 연동
      // const response = await api.dining.getReservation(formData.reservationId, formData.email);

      // 목업 데이터
      await new Promise((resolve) => setTimeout(resolve, 1000)); // API 호출 시뮬레이션

      // 예약 정보가 없는 경우
      if (formData.reservationId !== 'RES-123456' && formData.reservationId !== 'RES-654321') {
        setError('예약 정보를 찾을 수 없습니다. 예약 번호와 이메일을 확인해주세요.');
        setFoundReservation(null);
        return;
      }

      // 목업 예약 데이터
      const mockReservation = {
        id: formData.reservationId,
        date: '2024년 7월 15일 (월요일)',
        time: '오후 7:00',
        restaurant: '더 다이닝 룸',
        party: 4,
        name: '김지민',
        email: formData.email,
        phone: '010-1234-5678',
        status: '확정',
      };

      setFoundReservation(mockReservation);
    } catch (err) {
      console.error('Failed to search reservation:', err);
      setError('예약 정보를 조회하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSearching(false);
    }
  };

  /**
   * 예약 취소 핸들러
   */
  const handleCancel = async () => {
    if (!foundReservation) return;

    try {
      setIsCancelling(true);
      setError(null);

      // TODO: API 연동
      // await api.dining.cancelReservation(foundReservation.id);

      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsCancelled(true);
      setFoundReservation(null);
    } catch (err) {
      console.error('Failed to cancel reservation:', err);
      setError('예약을 취소하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">예약 취소</h1>
        <p className="text-gray-600">
          예약 번호와 예약 시 입력한 이메일을 입력하여 예약을 취소할 수 있습니다.
        </p>
      </div>

      {isCancelled ? (
        <Card className="shadow-md">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold">예약이 취소되었습니다</h2>
              <p className="text-gray-600 max-w-md">
                예약 취소가 정상적으로 처리되었습니다. 취소 확인 이메일이 발송되었습니다.
              </p>
              <div className="mt-6">
                <Link href="/dining">
                  <Button>다이닝 페이지로 돌아가기</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>예약 정보 검색</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 에러 메시지 */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* 검색 폼 */}
            {!foundReservation && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="reservationId">예약 번호</Label>
                  <Input
                    id="reservationId"
                    value={formData.reservationId}
                    onChange={(e) => handleInputChange('reservationId', e.target.value)}
                    placeholder="예: RES-123456"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">예약자 이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="예약 시 입력한 이메일"
                    required
                  />
                </div>

                <Button onClick={handleSearch} disabled={isSearching} className="w-full">
                  {isSearching ? '검색 중...' : '예약 검색'}
                </Button>

                <div className="text-sm text-gray-500 mt-2">
                  <p>테스트용 예약 정보:</p>
                  <p>예약 번호: RES-123456 또는 RES-654321, 이메일: 아무 이메일</p>
                </div>
              </div>
            )}

            {/* 검색 결과 */}
            {foundReservation && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-md space-y-3">
                  <div className="font-bold text-lg text-slate-900">
                    {foundReservation.restaurant}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-500">예약 번호</div>
                      <div className="font-medium">{foundReservation.id}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">예약 상태</div>
                      <div className="font-medium text-green-600">{foundReservation.status}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">날짜</div>
                      <div className="font-medium">{foundReservation.date}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">시간</div>
                      <div className="font-medium">{foundReservation.time}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">인원</div>
                      <div className="font-medium">{foundReservation.party}명</div>
                    </div>
                    <div>
                      <div className="text-gray-500">예약자 이름</div>
                      <div className="font-medium">{foundReservation.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">연락처</div>
                      <div className="font-medium">{foundReservation.phone}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">이메일</div>
                      <div className="font-medium">{foundReservation.email}</div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700">
                    예약을 취소하면 다시 복구할 수 없습니다. 취소하시겠습니까?
                  </AlertDescription>
                </Alert>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setFoundReservation(null)}
                    className="flex-1"
                  >
                    돌아가기
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleCancel}
                    disabled={isCancelling}
                    className="flex-1"
                  >
                    {isCancelling ? '취소 처리 중...' : '예약 취소하기'}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-start">
            <Link href="/dining">
              <Button variant="ghost" className="flex items-center text-gray-600">
                <ChevronLeft className="w-4 h-4 mr-1" />
                다이닝 페이지로 돌아가기
              </Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
