import Image from 'next/image';
/**
 * 객실 카드 컴포넌트 
 * 객실 정보와 가용성 정보를 표시하는 카드 컴포넌트입니다.
 * 
 * 초보자 가이드:
 * - 이 컴포넌트는 객실 목록에서 각 객실 정보를 표시하는 카드입니다.
 * - 객실 이미지, 이름, 설명, 크기, 인원, 전망, 가격 정보를 표시합니다.
 * - 가용성 정보(예약 가능 여부, 남은 객실 수)도 표시합니다.
 */
export default function RoomCard({
  room,
  onViewDetails,
  onBookNow,
}) {
  // 객실 이미지가 없을 경우 사용할 플레이스홀더 이미지 생성
  const placeholderImg = `https://placehold.co/800x600/e2e8f0/64748b.png?text=${encodeURIComponent(
    `${room.name ?? '이름없음'}\\n${room.size ?? '정보없음'}㎡`
  )}&font=montserrat`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      {/* 객실 이미지 */}
      <div className="relative h-48 bg-neutral-100">
        <Image
          src={room.imageUrl || placeholderImg}
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
        
        {/* 가용성 정보 (isBookable을 bookable로 변경) */}
        <div className="my-3">
          <span 
            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
              room.availability?.isBookable 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}
          >
            {room.availability?.isBookable 
              ? `예약 가능 (남은 객실 ${room.availability.available}실)` 
              : '예약 불가'}
          </span>
        </div>
        
        {/* 버튼 영역 */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onViewDetails(room.id)}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            상세보기
          </button>
          <button
            onClick={() => onBookNow(room.id)}
            disabled={!room.availability?.isBookable}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              room.availability?.isBookable
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
- 가용성 정보(availability)는 서버에서 계산되어 room 객체에 포함됩니다.
- 백엔드에서는 bookable 필드를 사용하지만, getter 메서드는 isBookable()입니다.
- 따라서 프론트엔드에서는 room.availability.isBookable로 접근합니다.
- 가용성 정보에 따라 예약 버튼의 활성화 여부가 결정됩니다.
*/