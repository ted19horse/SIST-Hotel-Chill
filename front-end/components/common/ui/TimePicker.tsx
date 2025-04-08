'use client';

import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { useState } from 'react';

interface TimePickerProps {
  availableTimes: string[];
  selectedTime: string;
  onChange: (time: string) => void;
  className?: string;
}

export function TimePicker({ availableTimes, selectedTime, onChange, className }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 시간 포맷팅 함수
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}:${minutes}`;
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-3 py-2 text-left border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          selectedTime ? 'text-gray-900' : 'text-gray-500'
        )}
      >
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 text-gray-500" />
          <span>{selectedTime ? formatTime(selectedTime) : '시간 선택'}</span>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {availableTimes.length > 0 ? (
            <ul className="py-1">
              {availableTimes.map((time) => (
                <li key={time}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(time);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100',
                      selectedTime === time && 'bg-primary/10 text-primary font-medium'
                    )}
                  >
                    {formatTime(time)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-2 text-gray-500">선택 가능한 시간이 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
}
