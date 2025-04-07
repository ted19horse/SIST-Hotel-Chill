'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';

export interface TimeSlot {
  time: string; // "18:00"
  available: boolean;
  capacity: number;
  remainingSeats: number;
}

interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

/**
 * 예약 가능한 시간 슬롯 컴포넌트
 */
export function TimeSlots({ timeSlots, selectedTime, onSelectTime }: TimeSlotsProps) {
  // 시간대별 그룹화 (점심, 저녁 등)
  const [activeTab, setActiveTab] = useState<string>('all');

  // 시간대 구분
  const getTimeOfDay = (time: string): string => {
    const hour = parseInt(time.split(':')[0], 10);
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  // 시간 포맷팅 (24시간 -> 12시간)
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? '오후' : '오전';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour}:${minutes}`;
  };

  // 시간대별 필터링
  const filteredTimeSlots =
    activeTab === 'all'
      ? timeSlots
      : timeSlots.filter((slot) => getTimeOfDay(slot.time) === activeTab);

  // 가용성 상태에 따른 텍스트 및 색상
  const getAvailabilityColor = (slot: TimeSlot): string => {
    if (!slot.available) return 'text-gray-400';
    if (slot.remainingSeats < 5) return 'text-amber-500';
    return 'text-green-500';
  };

  const getAvailabilityText = (slot: TimeSlot): string => {
    if (!slot.available) return '만석';
    if (slot.remainingSeats < 5) return `${slot.remainingSeats}석 남음`;
    return '예약 가능';
  };

  return (
    <div className="space-y-4">
      {/* 시간대 필터 탭 */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            activeTab === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체 시간
        </button>
        <button
          onClick={() => setActiveTab('morning')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            activeTab === 'morning'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          오전 (12시 이전)
        </button>
        <button
          onClick={() => setActiveTab('afternoon')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            activeTab === 'afternoon'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          오후 (12시~17시)
        </button>
        <button
          onClick={() => setActiveTab('evening')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            activeTab === 'evening'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          저녁 (17시 이후)
        </button>
      </div>

      {/* 시간 슬롯 그리드 */}
      {filteredTimeSlots.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
          {filteredTimeSlots.map((slot) => (
            <button
              key={slot.time}
              disabled={!slot.available}
              onClick={() => slot.available && onSelectTime(slot.time)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-md border
                ${
                  selectedTime === slot.time
                    ? 'border-primary bg-primary/5 text-primary'
                    : slot.available
                    ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                }
              `}
            >
              <div className="font-medium">{formatTime(slot.time)}</div>
              <div className={`text-xs flex items-center mt-1 ${getAvailabilityColor(slot)}`}>
                {slot.available && selectedTime === slot.time ? (
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                ) : (
                  <Clock className="h-3 w-3 mr-1" />
                )}
                {getAvailabilityText(slot)}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          이 시간대에 예약 가능한 시간이 없습니다.
        </div>
      )}
    </div>
  );
}
