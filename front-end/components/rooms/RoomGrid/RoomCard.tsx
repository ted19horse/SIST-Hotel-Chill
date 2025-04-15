/**
 * 객실 카드 컴포넌트
 * 
 * 객실 목록에서 각 객실 정보를 카드 형태로 표시하는 컴포넌트입니다.
 */

'use client';

import { ROOM_GRADE_DISPLAY } from '@/lib/types/room';
import { Maximize2, Users, Mountain } from 'lucide-react';
import Image from 'next/image';

/**
 * 객실 카드 컴포넌트
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomCard({
  room,
  onViewDetails,
  onBookNow,
}) {
  // 등급 정보
  const gradeInfo = ROOM_GRADE_DISPLAY[room.grade];
  
  // 전망 표시 텍스트
  const viewText = {
    'GARDEN': '정원 전망',
    'FOREST_TRAIL': '숲길 전망',
    'LAKE_MOUNTAIN': '호수/산 전망',
    'PREMIUM_CHOICE': '프리미엄 선택 전망',
  }[room.view];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      {/* 객실 이미지 */}
      <div className="relative h-48 bg-neutral-100">
        {room.images.length > 0 ? (
          <Image
            src={room.images[0] || "/placeholder.svg?height=400&width=600"}
            alt={room.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-neutral-200">
            <span className="text-neutral-500">이미지 없음</span>
          </div>
        )}
      </div>
      
      {/* 객실 정보 */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{room.name}</h3>
          <span className="text-sm font-medium text-blue-600 border border-blue-200 rounded-full px-2 py-1 bg-blue-50">
            {gradeInfo.name}
          </span>
        </div>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {room.description || gradeInfo.description}
        </p>
        
        {/* 객실 특징 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm text-neutral-500">
            <Maximize2 className="w-4 h-4 mr-1" />
            <span>{room.size}㎡</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <Users className="w-4 h-4 mr-1" />
            <span>최대 {room.maxOccupancy}인</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <Mountain className="w-4 h-4 mr-1" />
            <span>{viewText}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-500">
            <span className="font-bold text-neutral-800 mr-1">₩</span>
            <span>{room.price.weekday.toLocaleString()}</span>
            <span className="text-xs ml-1">/ 1박</span>
          </div>
        </div>
        
        {/* 가용성 정보 */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-neutral-500">
            {room.availability.available > 0
              ? `${room.availability.available}/${room.availability.total}객실 남음`
              : '예약 마감'}
          </span>
          
          {room.availability.available === 0 && (
            <span className="text-xs text-red-500 font-medium">현재 예약 불가</span>
          )}
        </div>
        
        {/* 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(room.id)}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            상세보기
          </button>
          
          <button
            onClick={() => onBookNow(room.id)}
            disabled={room.availability.available === 0}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              room.availability.available > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
}