'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
}

/**
 * 날짜 선택을 위한 캘린더 컴포넌트
 */
export function Calendar({
  selectedDate,
  onSelectDate,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
}: CalendarProps) {
  // 오늘 날짜를 기준으로 초기 달력 표시
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(selectedDate || today);

  // 현재 보고 있는 월의 첫째 날과 마지막 날
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const lastDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  // 달력에 표시할 날짜 배열 생성
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0: 일요일, 1: 월요일, ...
  const daysInMonth = lastDayOfMonth.getDate();

  // 이전 달 이동
  const goToPreviousMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  // 다음 달 이동
  const goToNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // 날짜가 선택 가능한지 확인
  const isDateEnabled = (date: Date) => {
    // 최소 날짜 체크
    if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) {
      return false;
    }

    // 최대 날짜 체크
    if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999))) {
      return false;
    }

    // 비활성화된 날짜 체크
    return !disabledDates.some(
      (disabledDate) =>
        disabledDate.getFullYear() === date.getFullYear() &&
        disabledDate.getMonth() === date.getMonth() &&
        disabledDate.getDate() === date.getDate()
    );
  };

  // 날짜 선택 핸들러
  const handleSelectDate = (date: Date) => {
    if (isDateEnabled(date)) {
      onSelectDate(date);
    }
  };

  // 달력 렌더링
  const renderCalendar = () => {
    const calendarDays = [];
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    // 요일 헤더 생성
    const weekHeader = (
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={`header-${index}`}
            className={`text-center text-sm font-medium py-1 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );

    // 월의 첫째 주 전에 있는 이전 달 날짜들을 채우기
    let calendarCells = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        0 - (startingDayOfWeek - i - 1)
      );
      calendarCells.push(
        <div key={`prev-${i}`} className="text-center py-2 text-gray-300">
          {prevMonthDate.getDate()}
        </div>
      );
    }

    // 현재 월의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
      const isSelected =
        selectedDate &&
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate();

      const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

      const isEnabled = isDateEnabled(date);
      const dayOfWeek = new Date(viewDate.getFullYear(), viewDate.getMonth(), day).getDay();

      calendarCells.push(
        <button
          key={`day-${day}`}
          onClick={() => handleSelectDate(date)}
          disabled={!isEnabled}
          className={`text-center py-2 rounded ${
            isSelected
              ? 'bg-primary text-white'
              : isToday
              ? 'bg-primary/10 text-primary'
              : isEnabled
              ? 'hover:bg-gray-100'
              : 'text-gray-300 cursor-not-allowed'
          } ${dayOfWeek === 0 ? 'text-red-500' : dayOfWeek === 6 ? 'text-blue-500' : ''}`}
        >
          {day}
        </button>
      );
    }

    // 월의 마지막 주 후에 있는 다음 달 날짜들을 채우기
    const totalCells = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    for (let i = calendarCells.length; i < totalCells; i++) {
      const nextMonthDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth() + 1,
        i - startingDayOfWeek - daysInMonth + 1
      );
      calendarCells.push(
        <div key={`next-${i}`} className="text-center py-2 text-gray-300">
          {nextMonthDate.getDate()}
        </div>
      );
    }

    // 7일씩 나누어 주 단위로 표시
    const weeks = [];
    for (let i = 0; i < calendarCells.length; i += 7) {
      weeks.push(
        <div key={`week-${i / 7}`} className="grid grid-cols-7">
          {calendarCells.slice(i, i + 7)}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {weekHeader}
        {weeks}
      </div>
    );
  };

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-1 rounded hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
          disabled={minDate && new Date(viewDate.getFullYear(), viewDate.getMonth(), 0) < minDate}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="font-medium">
          {viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
        </div>

        <button
          onClick={goToNextMonth}
          className="p-1 rounded hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
          disabled={
            maxDate && new Date(viewDate.getFullYear(), viewDate.getMonth() + 2, 0) > maxDate
          }
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {renderCalendar()}
    </div>
  );
}
