/**
 * 예약 성공 컴포넌트
 * 
 * 예약이 성공적으로 완료되었을 때 표시되는 성공 메시지 컴포넌트입니다.
 */

'use client';

interface BookingSuccessProps {
  message: string;
}

/**
 * 예약 성공 컴포넌트
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function BookingSuccess({ message }: BookingSuccessProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">예약 완료!</h2>
      <p className="text-green-700 mb-6">{message}</p>
      <p className="text-sm text-neutral-500">잠시 후 자동으로 메인 페이지로 이동합니다...</p>
    </div>
  );
}
