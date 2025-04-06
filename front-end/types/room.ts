export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: {
    total: number;
    adults: number;
    children: number;
  };
  amenities: string[];
  images: string[];
  type: string;
  view: string[];
  features: string[];
  size: string;
}

export interface RoomAvailability {
  [key: string]: {
    available: boolean;
    price: number;
  };
}

export interface RoomFilters {
  checkIn?: Date;
  checkOut?: Date;
  adults?: number;
  children?: number;
  infants?: number;
  roomType?: string;
  priceRange?: [number, number];
  view?: string[];
}
