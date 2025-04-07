'use client';

import { Calendar } from '@/components/common/ui/Calendar';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  label?: string;
}

/**
 * 예약 날짜 선택 컴포넌트
 */
export function DatePicker({
  selectedDate,
  onSelectDate,
  minDate = new Date(),
  maxDate,
  disabledDates,
  label = '날짜',
}: DatePickerProps) {
  // 현재 날짜로부터 30일 후를 기본 최대 날짜로 설정
  const defaultMaxDate = new Date();
  defaultMaxDate.setDate(defaultMaxDate.getDate() + 30);

  // 날짜 표시 형식
  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 MM월 dd일 (EEEE)', { locale: ko });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <div
          className={`flex items-center border rounded-md p-2 ${
            selectedDate ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
          <span className="flex-1">
            {selectedDate ? formatDate(selectedDate) : '날짜를 선택해주세요'}
          </span>
        </div>
        <div className="absolute left-0 z-10 mt-2">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            minDate={minDate}
            maxDate={maxDate || defaultMaxDate}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
}
