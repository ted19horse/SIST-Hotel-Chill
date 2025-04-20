import Image from 'next/image';
/**
 * 객실 카드 컴포넌트 (RoomCarousel.tsx와 변수명/구조 통일)
 * 버튼 영역은 그대로 유지, 나머지는 RoomCarousel.tsx 기준으로 리팩토링
 */
export default function RoomCard({
  room,
  onViewDetails,
  onBookNow,
}) {
  // RoomCarousel.tsx에서 사용한 placeholder 이미지 경로
  const placeholderImg = `https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
    `${room.name ?? '이름없음'}\n${room.size ?? '정보없음'}㎡`
  )}&font=montserrat`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      {/* 객실 이미지 */}
      <div className="relative h-48 bg-neutral-100">
        <Image
          src={room.images?.[0] || placeholderImg}
          alt={room.name ?? '이름없음'}
          fill
          className="object-cover"
        />
      </div>
      {/* 객실 정보 */}
      <div className="p-4">
        {/* 객실 이름/건물 */}
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-bold">{room.name ?? '이름없음'}</h3>
          {room.building && (
            <span className="text-xs font-medium border border-blue-200 rounded-full px-2 py-0.5 bg-blue-50 text-blue-600">{room.building}</span>
          )}
        </div>
        {/* 객실 설명 */}
        <p className="text-neutral-600 text-sm mb-2 line-clamp-2">{room.description || '\u00A0'}</p>
        {/* 크기, 인원, 뷰 등 요약 */}
        <div className="grid grid-cols-2 gap-2 text-xs text-neutral-500 mb-2">
          <div className="flex items-center gap-1">
            <span>크기:</span>
            <span>{room.size ? `${room.size}㎡` : '정보없음'}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span>최대 {room.maxAdults + room.maxChildren}인</span>
            <span className="text-[10px] text-neutral-400">성인 {room.maxAdults} + 아동 {room.maxChildren}</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <span>전망:</span>
            <span>{room.viewType || '정보없음'}</span>
          </div>
        </div>
        {/* 가격 정보 */}
        <div className="flex flex-col gap-1 text-sm mb-2">
          <span>평일: {room.weekdayPrice ? new Intl.NumberFormat('ko-KR').format(room.weekdayPrice) + '원' : '가격 정보 없음'}</span>
          <span>주말: {room.weekendPrice ? new Intl.NumberFormat('ko-KR').format(room.weekendPrice) + '원' : '가격 정보 없음'}</span>
          <span>시즌: {room.peakSeasonPrice ? new Intl.NumberFormat('ko-KR').format(room.peakSeasonPrice) + '원' : '가격 정보 없음'}</span>
        </div>
        {/* 버튼 영역(기존 코드 유지) */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onViewDetails(room.id)}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            상세보기
          </button>
          <button
            onClick={() => onBookNow(room.id)}
            // disabled={room.availability?.available === 0}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              room.availability?.available > 0
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

/*
초보자용 상세 주석:
- RoomCarousel.tsx의 변수명/구조와 100% 일치시켜야 프론트-백엔드 연동 오류를 방지할 수 있습니다.
- placeholderImg는 객실명/크기를 포함한 임시 이미지로, 실제 이미지가 없을 때만 사용합니다.
- 인원, 크기, 가격, 뷰 등 모든 정보는 RoomCarousel.tsx와 동일한 변수명만 사용해야 합니다.
*/