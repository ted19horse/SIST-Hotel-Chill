/**
 * 객실 예약 폼 내용 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 객실 예약을 위한 폼 UI 및 로직을 처리하는 클라이언트 컴포넌트입니다.
 * 날짜 선택, 인원 정보, 객실 정보 확인, 결제 정보 입력 등을 처리합니다.
 */

'use client';

import { RoomDisplay, ROOM_GRADE_DISPLAY } from '@/lib/types/room';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingSuccess from './parts/BookingSuccess';
import BookingForm from './parts/BookingForm';
import BookingSummary from './parts/BookingSummary';
import { addDays, differenceInDays } from 'date-fns';

interface RoomBookingFormContentProps {
  room: RoomDisplay;
  initialValues?: {
    checkIn?: Date;
    checkOut?: Date;
    adults?: number;
    children?: number;
  };
}

/**
 * 객실 예약 폼 내용 컴포넌트
 * 
 * 객실 예약을 위한 폼을 표시하고 처리하는 클라이언트 컴포넌트입니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomBookingFormContent({ 
  room, 
  initialValues 
}: RoomBookingFormContentProps) {
  const router = useRouter();
  
  // 예약 정보 상태
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: initialValues?.checkIn || addDays(new Date(), 1),
    checkOut: initialValues?.checkOut || addDays(new Date(), 2),
    adults: initialValues?.adults || 2,
    children: initialValues?.children || 0,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    agreeTos: false,
  });
  
  // 요금 계산 상태
  const [priceDetails, setPriceDetails] = useState({
    dailyRates: [] as { date: Date; price: number }[],
    totalPrice: 0,
    nights: 0,
  });
  
  // 에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // 폼 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  /**
   * 요금 계산 함수
   */
  const calculatePrice = useCallback(() => {
    const { checkIn, checkOut } = bookingInfo;
    
    if (!checkIn || !checkOut) return;
    
    const nights = differenceInDays(checkOut, checkIn);
    
    if (nights <= 0) return;
    
    const dailyRates: { date: Date; price: number }[] = [];
    let totalPrice = 0;
    
    const currentDate = new Date(checkIn);
    
    for (let i = 0; i < nights; i++) {
      // 간단한 요금 계산 로직 (실제로는 더 복잡할 수 있음)
      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // 주말: 토, 일
      
      // 월별 성수기 체크 (7-8월, 12월 하순-1월 초순)
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const isPeakSeason = 
        month === 7 || 
        month === 8 || 
        (month === 12 && day >= 20) || 
        (month === 1 && day <= 5);
      
      // 요금 결정
      let price: number;
      if (isPeakSeason) {
        price = room.price.peakSeason;
      } else if (isWeekend) {
        price = room.price.weekend;
      } else {
        price = room.price.weekday;
      }
      
      dailyRates.push({
        date: new Date(currentDate),
        price,
      });
      
      totalPrice += price;
      
      // 다음 날짜로 이동
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    setPriceDetails({ dailyRates, totalPrice, nights });
  }, [bookingInfo.checkIn, bookingInfo.checkOut, room.price]);
  
  // 날짜 변경 시 요금 다시 계산
  useEffect(() => {
    calculatePrice();
  }, [bookingInfo.checkIn, bookingInfo.checkOut, calculatePrice]);

  /**
   * 폼 유효성 검사
   */
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    // 날짜 검사
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!bookingInfo.checkIn) {
      newErrors.checkIn = '체크인 날짜를 선택해주세요.';
    } else if (bookingInfo.checkIn < today) {
      newErrors.checkIn = '체크인 날짜는 오늘 이후여야 합니다.';
    }
    
    if (!bookingInfo.checkOut) {
      newErrors.checkOut = '체크아웃 날짜를 선택해주세요.';
    } else if (bookingInfo.checkOut <= bookingInfo.checkIn) {
      newErrors.checkOut = '체크아웃 날짜는 체크인 날짜 이후여야 합니다.';
    }
    
    // 이름 검사
    if (!bookingInfo.guestName.trim()) {
      newErrors.guestName = '이름을 입력해주세요.';
    }
    
    // 이메일 검사
    if (!bookingInfo.guestEmail.trim()) {
      newErrors.guestEmail = '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingInfo.guestEmail)) {
      newErrors.guestEmail = '유효한 이메일 주소를 입력해주세요.';
    }
    
    // 전화번호 검사
    if (!bookingInfo.guestPhone.trim()) {
      newErrors.guestPhone = '전화번호를 입력해주세요.';
    } else if (!/^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/.test(bookingInfo.guestPhone)) {
      newErrors.guestPhone = '유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)';
    }
    
    // 약관 동의 검사
    if (!bookingInfo.agreeTos) {
      newErrors.agreeTos = '이용 약관에 동의해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [bookingInfo]);
  
  /**
   * 폼 제출 처리
   */
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!validateForm()) {
      // 에러가 있는 첫 번째 필드로 스크롤
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // 백엔드 연결 후에는 실제 API 호출로 대체
      // 현재는 성공 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 예약 성공 처리
      setSubmitResult({
        success: true,
        message: '예약이 성공적으로 완료되었습니다. 예약 정보는 이메일로 발송됩니다.',
      });
      
      // 예약 완료 후 마이페이지 또는 예약 확인 페이지로 이동 (백엔드 연결 후)
      // 현재는 5초 후 객실 목록 페이지로 이동
      setTimeout(() => {
        router.push('/rooms');
      }, 5000);
    } catch (error) {
      // 오류 처리
      setSubmitResult({
        success: false,
        message: '예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm, errors, router]);
  
  // 폼 제출 결과에 따른 렌더링
  if (submitResult?.success) {
    return <BookingSuccess message={submitResult.message} />;
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
      {/* 왼쪽 섹션: 예약 정보 폼 */}
      <div className="lg:w-2/3">
        <BookingForm 
          bookingInfo={bookingInfo}
          setBookingInfo={setBookingInfo}
          errors={errors}
          setErrors={setErrors}
          room={room}
        />
      </div>

      {/* 오른쪽 섹션: 예약 요약 및 확인 */}
      <div className="lg:w-1/3">
        <BookingSummary 
          room={room}
          bookingInfo={bookingInfo}
          priceDetails={priceDetails}
          isSubmitting={isSubmitting}
          errorMessage={submitResult && !submitResult.success ? submitResult.message : undefined}
        />
      </div>
    </form>
  );
}
