'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { MAX_OCCUPANCY, PRICE_RANGE, ROOM_GRADES } from '@/data/rooms/constants/filters';
import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';
import { formatNumber } from '@/lib/utils';
import { RoomGrade } from '@/types/room';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon, Search } from 'lucide-react';
import { useCallback } from 'react';

export default function RoomFiltersContent() {
  const { filters, updateFilter, resetFilters, applyFilters } = useRoomFilterStore();

  const handlePriceRangeChange = useCallback(
    (value: number[]) => {
      updateFilter('priceRange', value as [number, number]);
    },
    [updateFilter]
  );

  const handleRoomGradeChange = useCallback(
    (checked: boolean, grade: RoomGrade) => {
      if (checked) {
        updateFilter('roomGrades', [...filters.roomGrades, grade]);
      } else {
        updateFilter(
          'roomGrades',
          filters.roomGrades.filter((g) => g !== grade)
        );
      }
    },
    [filters.roomGrades, updateFilter]
  );

  const handleGuestsChange = useCallback(
    (value: string) => {
      const guests = Math.min(Math.max(parseInt(value) || 1, MAX_OCCUPANCY.MIN), MAX_OCCUPANCY.MAX);
      updateFilter('guests', guests);
    },
    [updateFilter]
  );

  const handleSearch = useCallback(() => {
    if (!filters.checkIn || !filters.checkOut) {
      alert('체크인/체크아웃 날짜를 선택해주세요.');
      return;
    }
    applyFilters();
  }, [filters.checkIn, filters.checkOut, applyFilters]);

  return (
    <div className="space-y-6 p-6">
      {/* 가격 범위 필터 */}
      <div className="space-y-2">
        <Label>가격 범위</Label>
        <div className="pt-2 px-1">
          <Slider
            min={PRICE_RANGE.MIN}
            max={PRICE_RANGE.MAX}
            step={PRICE_RANGE.STEP}
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₩{formatNumber(filters.priceRange[0])}</span>
            <span>₩{formatNumber(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* 객실 등급 필터 */}
      <div className="space-y-2">
        <Label>객실 등급</Label>
        <div className="grid gap-2">
          {ROOM_GRADES.map((grade) => (
            <div key={grade.grade} className="flex items-center space-x-2">
              <Checkbox
                id={grade.grade}
                checked={filters.roomGrades.includes(grade.grade)}
                onCheckedChange={(checked) =>
                  handleRoomGradeChange(checked as boolean, grade.grade)
                }
              />
              <Label htmlFor={grade.grade} className="flex-1">
                {grade.name}
                <span className="text-sm text-muted-foreground ml-1">
                  (최대 {grade.maxOccupancy}인)
                </span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* 투숙 인원 필터 */}
      <div className="space-y-2">
        <Label>투숙 인원</Label>
        <Input
          type="number"
          min={MAX_OCCUPANCY.MIN}
          max={MAX_OCCUPANCY.MAX}
          value={filters.guests}
          onChange={(e) => handleGuestsChange(e.target.value)}
        />
      </div>

      {/* 체크인/체크아웃 필터 */}
      <div className="space-y-2">
        <Label>체크인/체크아웃</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal h-auto py-3"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.checkIn ? (
                filters.checkOut ? (
                  <>
                    {format(filters.checkIn, 'PPP', { locale: ko })} -{' '}
                    {format(filters.checkOut, 'PPP', { locale: ko })}
                  </>
                ) : (
                  format(filters.checkIn, 'PPP', { locale: ko })
                )
              ) : (
                <span>날짜를 선택하세요</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.checkIn}
              selected={{
                from: filters.checkIn,
                to: filters.checkOut,
              }}
              onSelect={(range) => {
                updateFilter('checkIn', range?.from);
                updateFilter('checkOut', range?.to);
              }}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
              locale={ko}
              className="rounded-md border shadow"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* 검색 및 초기화 버튼 */}
      <div className="space-y-2">
        <Button className="w-full" onClick={handleSearch}>
          <Search className="w-4 h-4 mr-2" />
          객실 검색
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          필터 초기화
        </Button>
      </div>
    </div>
  );
}
