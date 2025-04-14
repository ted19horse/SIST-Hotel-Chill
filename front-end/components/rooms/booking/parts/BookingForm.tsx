/**
 * 예약 폼 컴포넌트
 * 
 * 객실 예약 정보를 입력받는 폼 부분을 담당하는 컴포넌트입니다.
 */

'use client';

import { RoomDisplay } from '@/lib/types/room';
import { useCallback, useMemo } from 'react';
import { addDays } from 'date-fns';

interface BookingFormProps {
  bookingInfo: {
    checkIn: Date;
    checkOut: Date;
    adults: number;
    children: number;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    specialRequests: string;
    paymentMethod: string;
    agreeTos: boolean;
  };
  setBookingInfo: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  room: RoomDisplay;
}

/**
 * 예약 폼 컴포넌트
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function BookingForm({
  bookingInfo,
  setBookingInfo,
  errors,
  setErrors,
  room
}: BookingFormProps) {
  /**
   * 폼 필드 변경 처리
   */
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // 체크박스 처리
    if (type === 'checkbox') {
      setBookingInfo(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setBookingInfo(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // 해당 필드 에러 초기화
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors, setBookingInfo, setErrors]);
  
  /**
   * 날짜 변경 처리
   */
  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (!value) return;
    
    const date = new Date(value);
    
    setBookingInfo(prev => ({
      ...prev,
      [name]: date,
    }));
    
    // 체크인 날짜가 체크아웃 날짜보다 늦으면 체크아웃 날짜 조정
    if (name === 'checkIn') {
      if (date >= bookingInfo.checkOut) {
        setBookingInfo(prev => ({
          ...prev,
          checkOut: addDays(date, 1),
        }));
      }
    }
    
    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [bookingInfo.checkOut, errors, setBookingInfo, setErrors]);
  
  /**
   * 인원 수 변경 처리
   */
  const handleGuestChange = useCallback((type: 'adults' | 'children', action: 'increment' | 'decrement') => {
    setBookingInfo(prev => {
      const currentValue = prev[type];
      let newValue: number;
      
      if (action === 'increment') {
        newValue = currentValue + 1;
      } else {
        newValue = Math.max(type === 'adults' ? 1 : 0, currentValue - 1);
      }
      
      // 최대 인원 체크
      const totalGuests = (type === 'adults' ? newValue : prev.adults) + 
                          (type === 'children' ? newValue : prev.children);
      
      if (totalGuests > room.maxOccupancy) {
        return prev; // 변경하지 않음
      }
      
      return {
        ...prev,
        [type]: newValue,
      };
    });
  }, [room.maxOccupancy, setBookingInfo]);
  
  // 오늘 날짜 (최소 날짜용)
  const today = useMemo(() => {
    const date = new Date();
    return date.toISOString().split('T')[0];
  }, []);
  
  // 체크인 날짜 문자열
  const checkInStr = useMemo(() => {
    return bookingInfo.checkIn?.toISOString().split('T')[0] || '';
  }, [bookingInfo.checkIn]);
  
  // 체크아웃 날짜 문자열
  const checkOutStr = useMemo(() => {
    return bookingInfo.checkOut?.toISOString().split('T')[0] || '';
  }, [bookingInfo.checkOut]);
  
  // 총 인원 수
  const totalGuests = bookingInfo.adults + bookingInfo.children;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-6">예약 정보</h2>
      
      {/* 날짜 선택 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">날짜 선택</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className="block text-sm font-medium text-neutral-700 mb-1">
              체크인 날짜 *
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={checkInStr}
              onChange={handleDateChange}
              min={today}
              className={`w-full border ${errors.checkIn ? 'border-red-500' : 'border-neutral-300'} rounded-md px-3 py-2`}
              required
            />
            {errors.checkIn && (
              <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="checkOut" className="block text-sm font-medium text-neutral-700 mb-1">
              체크아웃 날짜 *
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={checkOutStr}
              onChange={handleDateChange}
              min={checkInStr || today}
              className={`w-full border ${errors.checkOut ? 'border-red-500' : 'border-neutral-300'} rounded-md px-3 py-2`}
              required
            />
            {errors.checkOut && (
              <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* 인원 정보 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">인원 정보</h3>
        <p className="text-sm text-neutral-500 mb-3">
          최대 {room.maxOccupancy}인까지 가능합니다. (현재: {totalGuests}인)
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              성인
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleGuestChange('adults', 'decrement')}
                className="border border-neutral-300 rounded-l px-3 py-2 hover:bg-neutral-100"
              >
                -
              </button>
              <input
                type="number"
                value={bookingInfo.adults}
                readOnly
                className="w-12 border-y border-neutral-300 text-center py-2"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('adults', 'increment')}
                className="border border-neutral-300 rounded-r px-3 py-2 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              아동
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => handleGuestChange('children', 'decrement')}
                className="border border-neutral-300 rounded-l px-3 py-2 hover:bg-neutral-100"
              >
                -
              </button>
              <input
                type="number"
                value={bookingInfo.children}
                readOnly
                className="w-12 border-y border-neutral-300 text-center py-2"
              />
              <button
                type="button"
                onClick={() => handleGuestChange('children', 'increment')}
                className="border border-neutral-300 rounded-r px-3 py-2 hover:bg-neutral-100"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 예약자 정보 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">예약자 정보</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="guestName" className="block text-sm font-medium text-neutral-700 mb-1">
              이름 *
            </label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={bookingInfo.guestName}
              onChange={handleChange}
              className={`w-full border ${errors.guestName ? 'border-red-500' : 'border-neutral-300'} rounded-md px-3 py-2`}
              required
            />
            {errors.guestName && (
              <p className="text-red-500 text-sm mt-1">{errors.guestName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="guestEmail" className="block text-sm font-medium text-neutral-700 mb-1">
              이메일 *
            </label>
            <input
              type="email"
              id="guestEmail"
              name="guestEmail"
              value={bookingInfo.guestEmail}
              onChange={handleChange}
              className={`w-full border ${errors.guestEmail ? 'border-red-500' : 'border-neutral-300'} rounded-md px-3 py-2`}
              required
            />
            {errors.guestEmail && (
              <p className="text-red-500 text-sm mt-1">{errors.guestEmail}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="guestPhone" className="block text-sm font-medium text-neutral-700 mb-1">
              전화번호 *
            </label>
            <input
              type="tel"
              id="guestPhone"
              name="guestPhone"
              value={bookingInfo.guestPhone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              className={`w-full border ${errors.guestPhone ? 'border-red-500' : 'border-neutral-300'} rounded-md px-3 py-2`}
              required
            />
            {errors.guestPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.guestPhone}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* 추가 요청 사항 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">추가 요청 사항</h3>
        <textarea
          id="specialRequests"
          name="specialRequests"
          value={bookingInfo.specialRequests}
          onChange={handleChange}
          placeholder="객실 또는 숙박과 관련하여 호텔에 요청하실 내용이 있으면 입력해주세요."
          className="w-full border border-neutral-300 rounded-md px-3 py-2 h-32"
        ></textarea>
      </div>
      
      {/* 결제 방법 */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">결제 방법</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="credit_card"
              checked={bookingInfo.paymentMethod === 'credit_card'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">신용카드</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="bank_transfer"
              checked={bookingInfo.paymentMethod === 'bank_transfer'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">무통장 입금</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="pay_later"
              checked={bookingInfo.paymentMethod === 'pay_later'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <span className="ml-2">현장 결제</span>
          </label>
        </div>
      </div>
      
      {/* 이용 약관 동의 */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            name="agreeTos"
            checked={bookingInfo.agreeTos}
            onChange={handleChange}
            className={`h-4 w-4 mt-1 ${errors.agreeTos ? 'text-red-500' : 'text-blue-600'}`}
            required
          />
          <span className="ml-2 text-sm">
            예약 진행을 위해 필요한 개인정보 수집, 이용, 제공 및 취소 규정을 포함한 <a href="#" className="text-blue-600 hover:underline">이용 약관</a>에 동의합니다. *
          </span>
        </label>
        {errors.agreeTos && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeTos}</p>
        )}
      </div>
    </div>
  );
}
