'use client';

import { useRoomFilterStore } from '@/lib/stores/roomFilterStore';

export default function RoomFiltersContent() {
  const filters = useRoomFilterStore((state) => state.filters);
  const updateFilter = useRoomFilterStore((state) => state.updateFilter);

  return (
    <div className="filters-container p-4 bg-white rounded-lg shadow">
      {/* 가격 범위 필터 */}
      <div className="filter-group mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          가격 범위 (₩{filters.priceRange[0].toLocaleString()} - ₩
          {filters.priceRange[1].toLocaleString()})
        </label>
        <input
          type="range"
          min={0}
          max={1000000}
          step={50000}
          value={filters.priceRange[1]}
          onChange={(e) =>
            updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* 객실 유형 필터 */}
      <div className="filter-group mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">객실 유형</label>
        <select
          multiple
          value={filters.roomType}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, (option) => option.value);
            updateFilter('roomType', selected);
          }}
          className="w-full p-2 border rounded-lg"
        >
          <option value="standard">스탠다드</option>
          <option value="deluxe">디럭스</option>
          <option value="suite">스위트</option>
        </select>
      </div>

      {/* 투숙객 수 필터 */}
      <div className="filter-group mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">투숙객 수</label>
        <select
          value={filters.guests}
          onChange={(e) => updateFilter('guests', Number(e.target.value))}
          className="w-full p-2 border rounded-lg"
        >
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}명
            </option>
          ))}
        </select>
      </div>

      {/* 체크인/체크아웃 날짜 필터 */}
      <div className="filter-group mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">체크인</label>
        <input
          type="date"
          value={filters.checkIn?.toISOString().split('T')[0] || ''}
          onChange={(e) => updateFilter('checkIn', new Date(e.target.value))}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="filter-group mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">체크아웃</label>
        <input
          type="date"
          value={filters.checkOut?.toISOString().split('T')[0] || ''}
          onChange={(e) => updateFilter('checkOut', new Date(e.target.value))}
          className="w-full p-2 border rounded-lg"
        />
      </div>
    </div>
  );
}
