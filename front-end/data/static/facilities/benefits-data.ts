export const roomBenefits = {
  columnDefs: [
    { id: 'roomType', label: '객실 유형' },
    { id: 'wellnessAccess', label: '웰니스 센터 이용' },
    { id: 'yogaClass', label: '요가/명상 클래스' },
    { id: 'familyActivity', label: '가족 액티비티' },
    { id: 'spaTreatment', label: '스파 트리트먼트' },
    { id: 'cabanaPriority', label: '카바나 우선권' },
  ],
  roomTypes: [
    {
      id: 'comfort-harmony',
      displayName: '칠 컴포트 & 하모니 룸',
      benefits: {
        wellnessAccess: true,
        yogaClass: false,
        familyActivity: false,
        spaTreatment: false,
        cabanaPriority: false,
      },
    },
    {
      id: 'serenity',
      displayName: '칠 세레니티 룸',
      benefits: {
        wellnessAccess: true,
        yogaClass: {
          value: true,
          description: '1회 무료',
        },
        familyActivity: false,
        spaTreatment: false,
        cabanaPriority: false,
      },
    },
    {
      id: 'family-suite',
      displayName: '칠 패밀리 스위트',
      benefits: {
        wellnessAccess: true,
        yogaClass: false,
        familyActivity: {
          value: true,
          description: '1회 무료',
        },
        spaTreatment: false,
        cabanaPriority: false,
      },
    },
    {
      id: 'lake-suite',
      displayName: '칠 레이크 스위트',
      benefits: {
        wellnessAccess: true,
        yogaClass: {
          value: true,
          description: '1회 무료',
        },
        familyActivity: false,
        spaTreatment: {
          value: true,
          description: '30분 무료',
        },
        cabanaPriority: false,
      },
    },
    {
      id: 'ultimate-suite',
      displayName: '얼티밋 칠 스위트',
      benefits: {
        wellnessAccess: true,
        yogaClass: {
          value: true,
          description: '무제한 이용',
        },
        familyActivity: {
          value: true,
          description: '1회 무료',
        },
        spaTreatment: {
          value: true,
          description: '60분 무료',
        },
        cabanaPriority: true,
      },
    },
  ],
  additionalBenefits: [
    {
      title: '얼리 체크인 & 레이트 체크아웃',
      description:
        '스위트 객실 투숙객은 얼리 체크인(12:00부터)과 레이트 체크아웃(14:00까지) 우선권이 제공됩니다(객실 상황에 따라 달라질 수 있음).',
    },
    {
      title: '웰니스 센터 연장 이용',
      description:
        '스위트 객실 투숙객은 웰니스 센터를 05:30부터 23:00까지 이용할 수 있어, 일반 이용 시간을 초과하여 이용할 수 있습니다.',
    },
    {
      title: '다이닝 예약 우선권',
      description:
        '스위트 객실 투숙객은 모든 다이닝 장소에서 예약 우선권을 받으며, 칠 엘레강스 레스토랑 독점 이용 권한이 제공됩니다.',
    },
  ],
};
