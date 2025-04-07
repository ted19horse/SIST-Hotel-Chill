'use client';

import { Minus, Plus, Users2 } from 'lucide-react';

interface GuestCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

/**
 * 예약 인원 수 선택 컴포넌트
 */
export function GuestCounter({
  value,
  onChange,
  min = 1,
  max = 10,
  label = '인원',
}: GuestCounterProps) {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center border rounded-md overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className={`p-2 ${
            value <= min ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center justify-center py-2 px-3">
          <Users2 className="w-4 h-4 mr-2 text-gray-500" />
          <span className="font-medium">{value}명</span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className={`p-2 ${
            value >= max ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {max && <p className="text-xs text-gray-500">최대 {max}명까지 선택 가능합니다.</p>}
    </div>
  );
}
