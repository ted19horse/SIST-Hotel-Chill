export type RestaurantType = 'CHILL_BITES' | 'CHILL_GARDEN' | 'CHILL_ELEGANCE' | 'CHILL_MOMENTS';

export type RestaurantFeature =
  | 'ALL_DAY_DINING'
  | 'LOCAL_INGREDIENTS'
  | 'GARDEN_VIEW'
  | 'TERRACE'
  | 'PANORAMA_VIEW'
  | 'PREMIUM_DINING'
  | 'LOUNGE'
  | 'BAR'
  | 'LIVE_MUSIC';

export type DressCodeType = 'CASUAL' | 'SMART_CASUAL' | 'FORMAL';

export interface OperatingHours {
  open: string;
  close: string;
  sections?: {
    [key: string]: {
      name: string;
      start: string;
      end: string;
      days?: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
    };
  };
}

export interface CapacityDetail {
  total: number;
  indoor?: number;
  outdoor?: number;
  terrace?: number;
  bar?: number;
  lounge?: number;
  private?: number;
  details?: string;
}

export interface ReservationPolicy {
  required: boolean;
  recommendedFor?: string; // e.g., "6인 이상 단체", "주말 및 공휴일"
  advanceTime?: string; // e.g., "최소 1일 전"
  maxPartySize?: number;
  specialNotes?: string; // e.g., "테라스 좌석은 날씨에 따라 운영"
}

export interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  days: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
  startTime: string;
  endTime: string;
  isRegular: boolean;
  specialNotes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  type: RestaurantType;
  description: string;
  operatingHours: OperatingHours;
  capacity: CapacityDetail;
  features: RestaurantFeature[];
  images: string[];
  location: string;
  reservationPolicy: ReservationPolicy;
  dressCode: DressCodeType;
  exclusiveFor?: string[]; // e.g., ['CHILL_FAMILY_SUITE', 'CHILL_LAKE_SUITE']
  specialEvents?: SpecialEvent[];
  floorLevel?: string;
  viewType?: string;
  isOpen?: boolean;
}
