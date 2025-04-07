'use client';

import { TimeSlot, TimeSlots } from '@/components/common/ui/TimeSlots';
import api from '@/lib/api';
import { ApiResponse } from '@/types/api/common';
import { AvailableTime } from '@/types/api/dining';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TimePickerProps {
  restaurantId: string | number;
  selectedDate: Date | null;
  selectedTime: string | null;
  partySize: number;
  onSelectTime: (time: string | null) => void;
  label?: string;
}

/**
 * 예약 시간 선택 컴포넌트
 */
export function TimePicker({
  restaurantId,
  selectedDate,
  selectedTime,
  partySize,
  onSelectTime,
  label = '시간',
}: TimePickerProps) {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 선택된 날짜가 바뀌면 해당 날짜의 예약 가능 시간을 조회
  useEffect(() => {
    if (selectedDate && partySize > 0) {
      fetchAvailableTimes();
    } else {
      setTimeSlots([]);
    }
  }, [selectedDate, partySize, restaurantId]);

  // 예약 가능한 시간 조회
  const fetchAvailableTimes = async () => {
    if (!selectedDate) return;

    try {
      setIsLoading(true);
      setError(null);

      // 날짜 형식 변환 (YYYY-MM-DD)
      const dateString = selectedDate.toISOString().split('T')[0];

      // API 호출
      const response = await api.dining.getAvailableTimes({
        restaurantId,
        date: dateString,
        partySize,
      });

      // 응답 데이터를 TimeSlot 형식으로 변환
      const slots = mapApiResponseToTimeSlots(response);
      setTimeSlots(slots);

      // 이전에 선택한 시간이 새로운 예약 가능 시간 목록에 없으면 선택 초기화
      if (selectedTime && !slots.some((slot) => slot.time === selectedTime && slot.available)) {
        onSelectTime(null);
      }
    } catch (err) {
      console.error('Failed to fetch available times:', err);
      setError('예약 가능한 시간을 불러오는데 실패했습니다.');
      setTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  // API 응답을 TimeSlot 형식으로 변환
  const mapApiResponseToTimeSlots = (response: ApiResponse<AvailableTime[]>): TimeSlot[] => {
    if (!response.data) return [];

    return response.data.map((item) => ({
      time: item.time,
      available: item.available,
      capacity: item.capacity,
      remainingSeats: item.remainingSeats,
    }));
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {selectedDate ? (
        isLoading ? (
          <div className="flex items-center justify-center h-32 border rounded-md bg-gray-50">
            <div className="text-gray-500">예약 가능한 시간을 불러오는 중...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-32 border rounded-md bg-red-50">
            <div className="text-red-500">{error}</div>
          </div>
        ) : timeSlots.length === 0 ? (
          <div className="flex items-center justify-center h-32 border rounded-md bg-gray-50">
            <div className="text-gray-500">선택하신 날짜에 예약 가능한 시간이 없습니다.</div>
          </div>
        ) : (
          <TimeSlots
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            onSelectTime={onSelectTime}
          />
        )
      ) : (
        <div className="flex items-center border rounded-md p-3 text-gray-500">
          <Clock className="w-5 h-5 mr-2 text-gray-400" />
          <span>날짜를 먼저 선택해주세요</span>
        </div>
      )}
    </div>
  );
}
