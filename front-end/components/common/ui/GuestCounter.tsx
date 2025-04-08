'use client';

import { Button } from '@/components/common/ui/Button';
import { Minus, Plus } from 'lucide-react';

interface GuestCounterProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function GuestCounter({ value, onChange, min = 1, max = 10, className }: GuestCounterProps) {
  const handleDecrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={handleDecrease}
        disabled={value <= min}
        className="h-10 w-10"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="w-12 text-center font-medium">{value}</div>
      <Button
        variant="outline"
        size="icon"
        onClick={handleIncrease}
        disabled={value >= max}
        className="h-10 w-10"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
