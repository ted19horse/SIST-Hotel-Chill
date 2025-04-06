export default function RoomCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* 이미지 스켈레톤 */}
      <div className="relative h-48 bg-gray-200 animate-pulse" />

      {/* 컨텐츠 스켈레톤 */}
      <div className="p-4">
        {/* 제목 스켈레톤 */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />

        {/* 상세 정보 스켈레톤 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* 가격 정보 스켈레톤 */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
        </div>

        {/* 버튼 스켈레톤 */}
        <div className="flex gap-2">
          <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse" />
          <div className="h-9 bg-gray-200 rounded flex-1 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
