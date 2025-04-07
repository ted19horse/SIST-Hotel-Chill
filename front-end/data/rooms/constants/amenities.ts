import { AmenityGroup } from '@/types/room';
import {
  Bath,
  BedDouble,
  Bluetooth,
  Coffee,
  Droplets,
  Gift,
  Key,
  Laptop,
  Lock,
  Scale,
  ShowerHead,
  Tablet,
  Tv,
  UserCog,
  Utensils,
  Waves,
  Wifi,
  Wind,
  Wine,
} from 'lucide-react';

// 어메니티 타입 상수
export const AMENITY_TYPES = {
  COMMON: 'common',
  DELUXE: 'deluxe',
  PREMIUM: 'premium',
  PRESIDENTIAL: 'presidential',
} as const;

// 어메니티 그룹 정의
export const amenityGroups: AmenityGroup[] = [
  {
    id: 1,
    name: '공통 어메니티',
    icon: () => BedDouble,
    type: AMENITY_TYPES.COMMON,
    sortOrder: 1,
    items: [
      {
        id: 1,
        name: '고급 침구',
        icon: () => BedDouble,
        description: '최고급 덕다운 이불과 맞춤형 베개 메뉴 제공',
        sortOrder: 1,
      },
      {
        id: 2,
        name: '43인치 스마트 TV',
        icon: () => Tv,
        description: '넷플릭스, 유튜브 등 OTT 서비스가 탑재된 고화질 스마트 TV',
        sortOrder: 2,
      },
      {
        id: 3,
        name: '고속 무선 인터넷',
        icon: () => Wifi,
        description: '1Gbps 초고속 무선 인터넷 무료 제공',
        sortOrder: 3,
      },
      {
        id: 4,
        name: '객실 내 금고',
        icon: () => Lock,
        description: '노트북 수납 가능한 디지털 객실 금고',
        sortOrder: 4,
      },
      {
        id: 5,
        name: '미니바/미니 냉장고',
        icon: () => Wine,
        description: '엄선된 음료와 스낵이 구비된 미니바',
        sortOrder: 5,
      },
      {
        id: 6,
        name: '친환경 욕실 용품 세트',
        icon: () => ShowerHead,
        description: '프랑스 유기농 인증 샴푸, 컨디셔너, 바디워시',
        sortOrder: 6,
      },
      {
        id: 7,
        name: '슬리퍼 및 목욕 가운',
        icon: () => Bath,
        description: '100% 순면 소재의 슬리퍼와 목욕 가운',
        sortOrder: 7,
      },
      {
        id: 8,
        name: 'USB 충전 포트 및 멀티 어댑터',
        icon: () => Laptop,
        description: 'USB-A/C 충전 포트와 국제 규격 멀티 어댑터',
        sortOrder: 8,
      },
      {
        id: 9,
        name: '헤어 드라이어',
        icon: () => Wind,
        description: '다이슨 슈퍼소닉 헤어 드라이어',
        sortOrder: 9,
      },
      {
        id: 10,
        name: '커피/차 메이커',
        icon: () => Coffee,
        description: '일리 캡슐 커피와 프리미엄 차 세트',
        sortOrder: 10,
      },
    ],
  },
  {
    name: '디럭스 어메니티',
    icon: () => Coffee,
    type: AMENITY_TYPES.DELUXE,
    sortOrder: 2,
    items: [
      {
        name: '에스프레소 머신',
        icon: () => Coffee,
        description: '네스프레소 버츄오 플러스 머신과 캡슐 세트',
        sortOrder: 1,
      },
      {
        name: '필로우 미스트',
        icon: () => Droplets,
        description: '조향사가 블렌딩한 수면 향상 아로마 스프레이',
        sortOrder: 2,
      },
      {
        name: '욕실 체중계',
        icon: () => Scale,
        description: '스마트폰 연동 가능한 디지털 체중계',
        sortOrder: 3,
      },
      {
        name: '추가 욕실 용품',
        icon: () => Bath,
        description: '프리미엄 입욕제와 천연 소금 세트',
        sortOrder: 4,
      },
      {
        name: '블루투스 스피커',
        icon: () => Bluetooth,
        description: '뱅앤올룹슨 블루투스 스피커',
        sortOrder: 5,
      },
      {
        name: '친환경 텀블러',
        icon: () => Coffee,
        description: '스타벅스 리유저블 텀블러',
        sortOrder: 6,
      },
    ],
  },
  {
    name: '프리미엄 어메니티',
    icon: () => Tablet,
    type: AMENITY_TYPES.PREMIUM,
    sortOrder: 3,
    items: [
      {
        name: '태블릿 객실 컨트롤 시스템',
        icon: () => Tablet,
        description: 'iPad Pro로 제어하는 스마트 객실 시스템',
        sortOrder: 1,
      },
      {
        name: '개별 공기청정기',
        icon: () => Wind,
        description: '다이슨 공기청정기 겸용 선풍기',
        sortOrder: 2,
      },
      {
        name: '전용 라운지 이용권',
        icon: () => Key,
        description: '24시간 이용 가능한 프리미엄 라운지',
        sortOrder: 3,
      },
      {
        name: '턴다운 서비스',
        icon: () => BedDouble,
        description: '매일 저녁 제공되는 프리미엄 턴다운 서비스',
        sortOrder: 4,
      },
      {
        name: '조식 무료 제공',
        icon: () => Utensils,
        description: '메인 레스토랑 조식 뷔페 2인 무료',
        sortOrder: 5,
      },
      {
        name: '웰컴 어메니티',
        icon: () => Gift,
        description: '계절 과일과 수제 초콜릿 웰컴 패키지',
        sortOrder: 6,
      },
    ],
  },
  {
    name: '프레지덴셜 어메니티',
    icon: () => UserCog,
    type: AMENITY_TYPES.PRESIDENTIAL,
    sortOrder: 4,
    items: [
      {
        name: '개인 집사 서비스',
        icon: () => UserCog,
        description: '영어/일본어/중국어 가능한 24시간 전담 집사',
        sortOrder: 1,
      },
      {
        name: '프라이빗 체크인/체크아웃',
        icon: () => Key,
        description: '객실 내 프라이빗 체크인/체크아웃 서비스',
        sortOrder: 2,
      },
      {
        name: '객실 내 자쿠지',
        icon: () => Waves,
        description: '2-3인용 프라이빗 자쿠지',
        sortOrder: 3,
      },
      {
        name: '프리미엄 와인/주류 셀렉션',
        icon: () => Wine,
        description: '소믈리에가 엄선한 와인과 프리미엄 주류',
        sortOrder: 4,
      },
      {
        name: '프라이빗 다이닝 옵션',
        icon: () => Utensils,
        description: '미쉐린 스타 셰프의 객실 내 프라이빗 다이닝',
        sortOrder: 5,
      },
      {
        name: '스페셜 스파 패키지',
        icon: () => Droplets,
        description: '120분 커플 스파 트리트먼트 1회 무료',
        sortOrder: 6,
      },
    ],
  },
];

// 객실 등급별 어메니티 그룹 매핑
export const roomAmenityGroups = {
  comfort: [AMENITY_TYPES.COMMON],
  harmony: [AMENITY_TYPES.COMMON, AMENITY_TYPES.DELUXE],
  serenity: [AMENITY_TYPES.COMMON, AMENITY_TYPES.DELUXE, AMENITY_TYPES.PREMIUM],
  family: [AMENITY_TYPES.COMMON, AMENITY_TYPES.DELUXE, AMENITY_TYPES.PREMIUM],
  lake: [AMENITY_TYPES.COMMON, AMENITY_TYPES.DELUXE, AMENITY_TYPES.PREMIUM],
  ultimate: [
    AMENITY_TYPES.COMMON,
    AMENITY_TYPES.DELUXE,
    AMENITY_TYPES.PREMIUM,
    AMENITY_TYPES.PRESIDENTIAL,
  ],
} as const;
