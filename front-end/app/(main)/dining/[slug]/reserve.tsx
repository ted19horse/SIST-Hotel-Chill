'use client';

import { Button } from '@/components/common/ui/Button';
import useReservationStore from '@/lib/stores/reservationStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ReservationPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { date, guests, setDate, setGuests, resetStore } = useReservationStore();

  const handleSubmit = () => {
    // 예약 정보를 확인하고 다음 단계로 이동
    if (date && guests > 0) {
      // 예약 정보가 유효한 경우
      router.push(`/dining/${slug}/confirmation`); // 확인 페이지로 이동
    } else {
      alert('날짜와 인원수를 선택해 주세요.');
    }
  };

  // 컴포넌트 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      resetStore(); // 상태 초기화
    };
  }, [resetStore]);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">예약하기</h1>
      <div className="mb-4">
        <label className="block mb-2">날짜 선택</label>
        <input
          type="date"
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">인원수</label>
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          className="border rounded p-2"
        />
      </div>
      <Button onClick={handleSubmit} className="w-full">
        예약 확인
      </Button>
    </div>
  );
}
