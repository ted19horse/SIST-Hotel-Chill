/**
 * 객실 카드 스켈레톤 컴포넌트
 * 
 * 객실 데이터 로딩 중에 표시되는 로딩 스켈레톤 컴포넌트입니다.
 */

/**
 * 객실 카드 스켈레톤 컴포넌트
 * 
 * @returns JSX.Element
 */
export default function RoomCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* 이미지 영역 */}
      <div className="h-48 bg-neutral-200" />
      
      {/* 콘텐츠 영역 */}
      <div className="p-4">
        {/* 제목 영역 */}
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-neutral-200 rounded w-3/5" />
          <div className="h-6 bg-neutral-200 rounded-full w-1/4" />
        </div>
        
        {/* 설명 영역 */}
        <div className="h-4 bg-neutral-200 rounded w-full mb-1" />
        <div className="h-4 bg-neutral-200 rounded w-4/5 mb-4" />
        
        {/* 특징 영역 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 bg-neutral-200 rounded w-4/5" />
          <div className="h-4 bg-neutral-200 rounded w-4/5" />
          <div className="h-4 bg-neutral-200 rounded w-4/5" />
          <div className="h-4 bg-neutral-200 rounded w-4/5" />
        </div>
        
        {/* 가용성 정보 */}
        <div className="h-4 bg-neutral-200 rounded w-2/5 mb-4" />
        
        {/* 버튼 영역 */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-neutral-200 rounded" />
          <div className="flex-1 h-10 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
}
