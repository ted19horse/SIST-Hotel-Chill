export const facilities = [
  {
    id: 'wellness-center',
    name: 'Chill Wellness Center',
    displayName: '칠 웰니스 센터',
    location: '호텔 메인동 1-2층',
    concept: '심신의 휴식과 재충전을 위한 종합 웰니스 공간',
    keyFacilities: [
      {
        name: '무한 치킬 풀',
        description: '호수 전망의 인피니티 실내/야외 수영장 (연중 온수로 운영)',
      },
      {
        name: '젠 존',
        description: '핀란드식 사우나, 아로마 스팀룸, 히말라야 솔트룸',
      },
      {
        name: '24/7 칠 핏',
        description: '최신 설비의 피트니스 센터 (24시간 운영)',
      },
      {
        name: '마인드 스튜디오',
        description: '요가, 명상, 필라테스 클래스 진행 공간',
      },
      {
        name: '칠 리커버리',
        description: '운동 후 회복을 위한 스포츠 마사지와 치료 서비스',
      },
    ],
    operatingHours: '수영장: 06:00-22:00, 사우나/스팀룸: 07:00-22:00, 피트니스 센터: 24시간',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: false,
  },
  {
    id: 'serenity-spa',
    name: 'Chill Serenity Spa',
    displayName: '칠 세레니티 스파',
    location: '호텔 별관 전용 동',
    concept: '맞춤형 힐링 트리트먼트를 통한 깊은 휴식 경험',
    keyFacilities: [
      {
        name: '저스트 칠 마사지',
        description: '호텔 시그니처 전신 마사지',
      },
      {
        name: '포레스트 캄',
        description: '주변 숲에서 채취한 향을 활용한 아로마테라피',
      },
      {
        name: '레이크 리플렉션',
        description: '수분 공급 및 회복에 초점을 맞춘 페이셜 트리트먼트',
      },
      {
        name: '커플스 리트릿',
        description: '커플을 위한 프라이빗 스파 패키지',
      },
      {
        name: '얼티밋 칠 익스피리언스',
        description: '4시간 동안 진행되는 풀 바디 럭셔리 트리트먼트',
      },
    ],
    operatingHours: '10:00-21:00 (예약제)',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: true,
  },
  {
    id: 'nature-zone',
    name: 'Nature Chill Zone',
    displayName: '네이처 칠 존',
    location: '호텔 외부 정원 및 주변 자연 환경',
    concept: '자연 속에서 즐기는 여유로운 힐링 활동',
    keyFacilities: [
      {
        name: '칠 패스',
        description: '호수와 숲을 잇는 4km 길이의 산책로/조깅 트랙',
      },
      {
        name: '사일런트 가든',
        description: '명상과 요가를 위한 조용한 정원 공간',
      },
      {
        name: '레이크 칠 덱',
        description: '호수 전망의 휴식 데크와 프라이빗 카바나',
      },
      {
        name: '허브 헤이븐',
        description: '방문객이 체험할 수 있는 허브 가든',
      },
      {
        name: '시즌널 칠',
        description: '계절별 다양한 야외 액티비티',
      },
    ],
    operatingHours: '일출-일몰 (계절에 따라 변동)',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: false,
  },
  {
    id: 'lounge-entertainment',
    name: 'Chill Lounge & Entertainment',
    displayName: '칠 라운지 & 엔터테인먼트',
    location: '호텔 메인동 3층',
    concept: '사교와 문화적 휴식을 위한 다목적 공간',
    keyFacilities: [
      {
        name: '북 & 칠',
        description: '조용한 독서와 휴식을 위한 북 라운지',
      },
      {
        name: '아트 오브 칠',
        description: '지역 예술가와 힐링 테마 작품을 전시하는 소규모 갤러리',
      },
      {
        name: '칠 바이브스',
        description: '주말에는 생음악 공연과 문화 이벤트가 열리는 공간',
      },
      {
        name: '디지털 디톡스 덴',
        description: '디지털 기기 없이 즐기는 보드게임, 퍼즐 등 제공',
      },
      {
        name: '칠 시네마',
        description: '소규모 영화 상영실',
      },
    ],
    operatingHours: '09:00-23:00',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: false,
  },
  {
    id: 'business-chill',
    name: 'Business Chill',
    displayName: '비즈니스 칠',
    location: '호텔 메인동 B1층',
    concept: '휴식을 병행하는 업무 및 행사 공간',
    keyFacilities: [
      {
        name: '프로덕티비티 라운지',
        description: '24시간 비즈니스 센터',
      },
      {
        name: '밸런스 룸',
        description: '소/중형 회의실(10-30인)',
      },
      {
        name: '하모니 홀',
        description: '최대 150인까지 수용 가능한 대형 연회장',
      },
      {
        name: '프라이빗 다이닝 칠',
        description: '최대 20인까지 수용 가능한 프라이빗 다이닝룸',
      },
      {
        name: '워크 & 칠',
        description: '코워킹 스타일의 업무 공간',
      },
    ],
    operatingHours: '24시간 (연회장/미팅룸은 예약제)',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: true,
  },
  {
    id: 'kids-family',
    name: 'Chill Kids & Family',
    displayName: '칠 키즈 & 패밀리',
    location: '호텔 메인동 B2층',
    concept: '가족 모두가 함께 즐기는 활동과 휴식을 위한 공간',
    keyFacilities: [
      {
        name: '미니 칠 존',
        description: '전문 보육 스태프가 상주하는 키즈 플레이룸',
      },
      {
        name: '패밀리 칠',
        description: '가족이 함께 즐길 수 있는 게임, 공예 등 액티비티 공간',
      },
      {
        name: '스플래시 칠',
        description: '어린이 전용 수영장과 워터 플레이 공간',
      },
      {
        name: '패밀리 리트릿 프로그램',
        description: '부모와 자녀가 함께하는 요가, 명상, 아트 클래스',
      },
      {
        name: '틴 칠 라운지',
        description: '청소년 전용 공간',
      },
    ],
    operatingHours: '09:00-21:00',
    image: '/placeholder.svg?height=800&width=1200',
    requiresReservation: true,
  },
];
