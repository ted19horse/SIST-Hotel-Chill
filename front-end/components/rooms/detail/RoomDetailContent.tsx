/**
 * 객실 상세 내용 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 객실 상세 정보를 표시하고 예약 기능을 제공하는 클라이언트 컴포넌트입니다.
 * 이미지 갤러리, 객실 정보, 어메니티, 객실 특징, 예약 버튼 등을 포함합니다.
 */

'use client';

import { RoomDisplay, ROOM_GRADE_DISPLAY } from '@/types/room';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  Maximize2, 
  Home, 
  Mountain, 
  Bed, 
  Eye, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import Image from 'next/image';

interface RoomDetailContentProps {
  room: RoomDisplay;
}

/**
 * 객실 상세 내용 컴포넌트
 * 
 * 객실의 상세 정보를 표시하는 클라이언트 컴포넌트입니다.
 * 
 * @param props 컴포넌트 속성
 * @returns JSX.Element
 */
export default function RoomDetailContent({ room }: RoomDetailContentProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // 등급 정보 가져오기
  const gradeInfo = ROOM_GRADE_DISPLAY[room.grade];
  
  /**
   * 예약 페이지로 이동
   */
  const handleBookNow = useCallback(() => {
    router.push(`/rooms/booking?roomId=${room.id}`);
  }, [router, room.id]);
  
  /**
   * 이전 이미지 표시
   */
  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  }, [room.images.length]);
  
  /**
   * 다음 이미지 표시
   */
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  }, [room.images.length]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 왼쪽 섹션: 이미지 갤러리 및 객실 정보 */}
      <div className="lg:w-2/3">
        {/* 이미지 갤러리 */}
        <div className="relative mb-6 rounded-lg overflow-hidden group">
          <div 
            className="relative w-full aspect-video bg-neutral-100"
            aria-label={`객실 이미지 ${currentImageIndex + 1}/${room.images.length}`}
          >
            {room.images.length > 0 ? (
              <Image
                src={room.images[currentImageIndex] || "/placeholder.svg?height=600&width=800"}
                alt={`${room.name} 이미지 ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                <span className="text-neutral-500">이미지 없음</span>
              </div>
            )}
            
            {/* 이미지 네비게이션 버튼 */}
            {room.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="이전 이미지"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow opacity-70 hover:opacity-100 transition-opacity"
                  aria-label="다음 이미지"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            
            {/* 이미지 인디케이터 */}
            {room.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {room.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`${index + 1}번 이미지로 이동`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 객실 정보 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
          <p className="text-neutral-600 text-lg mb-4">{gradeInfo.description}</p>
        </div>

        {/* 객실 특징 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">객실 특징</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Maximize2 className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">객실 크기</p>
                <p className="text-neutral-600">{room.size}㎡</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">최대 인원</p>
                <p className="text-neutral-600">{room.maxOccupancy}인</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bed className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">침대 타입</p>
                <p className="text-neutral-600">킹 사이즈</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Home className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">건물</p>
                <p className="text-neutral-600">{room.building}동</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">전망</p>
                <p className="text-neutral-600">
                  {room.view === 'GARDEN' && '정원 전망'}
                  {room.view === 'FOREST_TRAIL' && '숲길 전망'}
                  {room.view === 'LAKE_MOUNTAIN' && '호수/산 전망'}
                  {room.view === 'PREMIUM_CHOICE' && '프리미엄 선택 전망'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Eye className="text-blue-600 h-5 w-5" />
              <div>
                <p className="font-medium">층수</p>
                <p className="text-neutral-600">{room.floorCount}층</p>
              </div>
            </div>
          </div>
        </div>

        {/* 객실 설명 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">객실 설명</h2>
          <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
            {room.description || "아직 상세 설명이 작성되지 않았습니다."}
          </p>
        </div>

        {/* 객실 특징 (bullet points) */}
        {room.features && room.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">제공 서비스</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {room.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-blue-600 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 오른쪽 섹션: 예약 정보 및 버튼 */}
      <div className="lg:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
          <h2 className="text-2xl font-bold mb-4">요금 정보</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">주중 요금</span>
              <span className="text-lg">{room.price.weekday.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">주말 요금</span>
              <span className="text-lg">{room.price.weekend.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="font-medium">성수기 요금</span>
              <span className="text-lg">{room.price.peakSeason.toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center text-sm text-neutral-600 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              요금은 날짜에 따라 달라질 수 있습니다.
            </div>
            <div className="flex items-center text-sm text-neutral-600">
              <Users className="h-4 w-4 mr-1" />
              객실 최대 수용 인원: {room.maxOccupancy}인
            </div>
          </div>
          
          {/* 가용성 정보 */}
          <div className="mb-6 p-3 bg-blue-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium">남은 객실 수</span>
              <span>
                <span className="font-medium">{room.availability.available}</span>
                /{room.availability.total}
              </span>
            </div>
          </div>
          
          {/* 예약 버튼 */}
          <button
            onClick={handleBookNow}
            disabled={room.availability.available === 0}
            className={`w-full py-3 rounded-md font-medium ${
              room.availability.available > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {room.availability.available > 0 ? '객실 예약하기' : '예약 불가'}
          </button>
          
          {room.availability.available === 0 && (
            <p className="text-sm text-red-500 mt-2 text-center">
              현재 예약 가능한 객실이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
