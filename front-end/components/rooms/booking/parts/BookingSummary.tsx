/**
 * 예약 요약 컴포넌트
 * 
 * 객실 예약 정보 요약과 가격 정보를 표시하는 컴포넌트입니다.
 */

'use client';

import { RoomDisplay, ROOM_GRADE_DISPLAY } from '@/lib/types/room';
import Image from 'next/image';

interface BookingSummaryProps {
  room: RoomDisplay;
  bookingInfo: {
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
  };
  priceDetails: {
    dailyRates: { date: Date; price: number }[];
    totalPrice: number;
    nights: number;
  };
  isSubmitting: boolean;
  errorMessage?: string;
}

/**
 * 예약 요약 컴포넌트
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function BookingSummary({
  room,
  bookingInfo,
  priceDetails,
  isSubmitting,
  errorMessage
}: BookingSummaryProps) {
  // 객실 등급 정보
  const gradeInfo = ROOM_GRADE_DISPLAY[room.grade];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
      <h2 className="text-2xl font-bold mb-6">예약 요약</h2>
      
      {/* 객실 정보 */}
      <div className="flex items-center mb-6">
        <div className="relative w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
          {room.images.length > 0 ? (
            <Image
              src={room.images[0] || "/placeholder.svg?height=100&width=100"}
              alt={room.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
              <span className="text-xs text-neutral-500">이미지 없음</span>
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <h3 className="font-semibold">{room.name}</h3>
          <p className="text-sm text-neutral-600">{gradeInfo.description.split(',')[0]}</p>
        </div>
      </div>
      
      {/* 예약 상세 */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-neutral-600">체크인</span>
          <span className="font-medium">
            {bookingInfo.checkIn?.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">체크아웃</span>
          <span className="font-medium">
            {bookingInfo.checkOut?.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">숙박 일수</span>
          <span className="font-medium">{priceDetails.nights}박</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-600">인원</span>
          <span className="font-medium">
            성인 {bookingInfo.adults}명
            {bookingInfo.children > 0 && `, 아동 ${bookingInfo.children}명`}
          </span>
        </div>
      </div>
      
      {/* 요금 상세 */}
      <div className="border-t border-b py-4 mb-6">
        <h3 className="font-semibold mb-3">요금 상세</h3>
        <div className="space-y-2">
          {priceDetails.dailyRates.map((rate, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {rate.date.toLocaleDateString('ko-KR', {
                  month: 'short',
                  day: 'numeric',
                  weekday: 'short',
                })}
              </span>
              <span>{rate.price.toLocaleString()}원</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between font-bold mt-4 pt-3 border-t">
          <span>총 요금</span>
          <span>{priceDetails.totalPrice.toLocaleString()}원</span>
        </div>
      </div>
      
      {/* 예약 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white rounded-md py-3 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? '예약 처리 중...' : '예약 완료하기'}
      </button>
      
      {/* 에러 메시지 */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
