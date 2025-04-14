export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export type TableType = 'WINDOW' | 'TERRACE' | 'REGULAR' | 'PRIVATE' | 'BAR';

export interface TableInfo {
  id: string;
  type: TableType;
  capacity: number;
  location: string;
  isAvailable: boolean;
}

export interface SpecialRequest {
  type: 'DIETARY' | 'SEATING' | 'OCCASION' | 'OTHER';
  description: string;
}

export interface DiningReservation {
  id: string;
  restaurantId: string;
  userId: string;
  date: string;
  time: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';
  reservationNumber: string;
  specialRequests?: string;
  tableType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationRequest {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  tableType?: string;
  contactPhone?: string;
  contactEmail?: string;
  userName?: string;
}

export interface ReservationTimeSlot {
  time: string;
  available: boolean;
  maxPartySize: number;
}

export interface AvailabilityRequest {
  restaurantId: string;
  date: string;
  partySize: number;
}

export interface AvailabilityResponse {
  date: string;
  restaurantId: string;
  timeSlots: ReservationTimeSlot[];
}

export interface ReservationCancellationRequest {
  reservationId: string;
  cancellationReason?: string;
}

export interface ReservationModificationRequest extends ReservationRequest {
  reservationId: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  capacity: number;
  tables: TableInfo[];
}
