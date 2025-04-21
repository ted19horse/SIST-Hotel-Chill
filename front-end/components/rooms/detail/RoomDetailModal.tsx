'use client';

/**
 * 객실 상세 정보 모달 컴포넌트
 * 
 * 객실 상세 정보를 모달 형태로 표시하는 컴포넌트입니다.
 * 객실 데이터를 직접 받아 해당 객실의 상세 정보를 표시합니다.
 */

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import RoomDetailContent from './RoomDetailContent';

interface RoomDetailModalProps {
  room: any; // 객실 데이터 직접 전달
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 객실 상세 정보 모달 컴포넌트
 * 
 * @param room 객실 데이터 객체
 * @param isOpen 모달 열림 여부
 * @param onClose 모달 닫기 콜백 함수
 * @returns JSX.Element
 */
export default function RoomDetailModal({ room, isOpen, onClose }: RoomDetailModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // 스크롤 복원
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // 예약 페이지로 이동하는 함수 (RoomDetailContent에서 사용하는 핸들러를 오버라이드)
  const handleBookNow = () => {
    if (room) {
      router.push(`/rooms/booking?roomId=${room.id}`);
      onClose(); // 모달 닫기
    }
  };

  if (!isOpen || !room) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-center items-start overflow-y-auto bg-black bg-opacity-50 p-4 pt-20" 
      aria-modal="true"
      role="dialog"
      aria-labelledby="room-detail-modal-title"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[80vh] overflow-y-auto"
      >
        {/* 모달 헤더 */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center px-6 py-4 border-b">
          <h2 id="room-detail-modal-title" className="text-2xl font-bold">{room.name}</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 p-1 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="모달 닫기"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-6">
          <RoomDetailContent 
            room={room} 
            isModal={true}
            onBookNowOverride={handleBookNow}
          />
        </div>
      </div>
    </div>
  );
}
