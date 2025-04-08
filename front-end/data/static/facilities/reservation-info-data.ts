export const reservationInfo = {
  advanceRequirements: [
    {
      id: 'spa',
      title: '스파 트리트먼트',
      description: '최소 2시간 전 예약 권장. 프리미엄 트리트먼트와 주말 예약은 1-2일 전 예약 권장.',
      icon: 'Clock',
    },
    {
      id: 'yoga',
      title: '요가 & 명상 클래스',
      description: '1일 전 예약 필수 (최대 12명). 클래스 시간: 07:00, 10:00, 17:00.',
      icon: 'Users',
    },
    {
      id: 'cabana',
      title: '프라이빗 카바나',
      description:
        '성수기에는  3일 전 예약 권장. 카바나는 프리미엄 서비스, 다과, 호수 전망을 제공합니다.',
      icon: 'Sparkles',
    },
    {
      id: 'meeting',
      title: '미팅룸 & 연회장',
      description: '1주일 전 예약 필수. 대규모 행사와 컨퍼런스는 최소 1개월 전 예약 권장.',
      icon: 'CalendarClock',
    },
    {
      id: 'kids',
      title: '키즈 케어 서비스',
      description: '4시간 전 예약 필수. 전문 보육 서비스는 3-12세 어린이에게 제공됩니다.',
      icon: 'Users',
    },
  ],
  howToReserve: [
    {
      id: 'in-person',
      title: '방문 예약',
      description: '메인 로비의 컨시어지 데스크에서 24시간 예약 가능합니다.',
    },
    {
      id: 'phone',
      title: '전화 예약',
      description:
        '예약 센터 02-123-4567(내선 1234)로 연락하세요. 매일 08:00-20:00 이용 가능합니다.',
    },
    {
      id: 'in-room',
      title: '객실 내 예약',
      description:
        '객실 내 태블릿을 이용하거나 객실 전화로 "0"번을 눌러 게스트 서비스팀에 연락하세요.',
    },
    {
      id: 'online',
      title: '온라인 예약',
      description: '홈페이지에 로그인하거나 칠 헤이븐 모바일 앱을 통해 시설을 예약하세요.',
    },
    {
      id: 'pre-arrival',
      title: '사전 도착 서비스',
      description: '체크인 3일 전에 사전 도착 컨시어지가 시설 예약을 도와드립니다.',
    },
  ],
  cancellationPolicy:
    '대부분의 서비스는 4시간 전 취소 통지가 필요하며, 스파 트리트먼트와 프라이빗 이벤트는 취소 수수료를 피하기 위해 24시간 전 취소가 필요합니다.',
};
