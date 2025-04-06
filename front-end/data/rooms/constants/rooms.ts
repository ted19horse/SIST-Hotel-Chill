import { RoomGradeDisplay } from '@/types/room';

// 객실 등급별 표시 정보
export const ROOM_GRADE_DISPLAY: RoomGradeDisplay = {
  ULTIMATE_CHILL_SUITE: {
    name: 'Ultimate Chill Suite',
    grade: 1,
    description:
      '최고급 시설과 개인 맞춤 서비스, 넓은 공간, 고객이 선호하는 프리미엄 전망 선택 가능',
  },
  CHILL_LAKE_SUITE: {
    name: 'Chill Lake Suite',
    grade: 2,
    description:
      '비즈니스와 휴식을 동시에, 넓은 업무공간과 휴식공간, 호수와 산이 어우러진 아름다운 전망',
  },
  CHILL_FAMILY_SUITE: {
    name: 'Chill Family Suite',
    grade: 3,
    description: '가족 단위 투숙객을 위한 분리된 거실과 침실, 울창한 숲과 아름다운 오솔길 전망',
  },
  CHILL_SERENITY_ROOM: {
    name: 'Chill Serenity Room',
    grade: 4,
    description: '고급 침구와 가구, 넓은 욕실, 일부 객실 테라스 포함',
  },
  CHILL_HARMONY_ROOM: {
    name: 'Chill Harmony Room',
    grade: 5,
    description: '넓은 공간과 고급스러운 인테리어, 휴식을 위한 추가 소파공간',
  },
  CHILL_COMFORT_ROOM: {
    name: 'Chill Comfort Room',
    grade: 6,
    description: '심플하고 편안한 기본형 객실, 자연적 요소가 가미된 인테리어',
  },
} as const;
