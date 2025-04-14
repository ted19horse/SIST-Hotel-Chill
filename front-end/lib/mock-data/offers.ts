/**
 * 특별 오퍼 더미 데이터
 */
import { SpecialOffer } from '@/lib/types/my-account';

export const mockSpecialOffers: SpecialOffer[] = [
  {
    id: 'offer-1',
    title: 'Weekend Escape Package',
    description: '50% off second night when you book a weekend stay',
    pointsRequired: 0,
    validUntil: '2025-05-31',
    image: '/placeholder.svg?height=300&width=500',
  },
  {
    id: 'offer-2',
    title: 'Spa Credit',
    description: '₩100,000 spa credit with any treatment booking',
    pointsRequired: 15000,
    validUntil: '2025-04-30',
    image: '/placeholder.svg?height=300&width=500',
  },
  {
    id: 'offer-3',
    title: 'Complimentary Room Upgrade',
    description: 'Guaranteed room upgrade on your next stay',
    pointsRequired: 20000,
    validUntil: '2025-06-30',
    image: '/placeholder.svg?height=300&width=500',
  },
  {
    id: 'offer-4',
    title: 'Dining Experience',
    description: "Chef's special dining experience for two",
    pointsRequired: 25000,
    validUntil: '2025-07-15',
    image: '/placeholder.svg?height=300&width=500',
  },
  {
    id: 'offer-5',
    title: 'Late Check-out',
    description: 'Guaranteed late check-out until 4PM',
    pointsRequired: 10000,
    validUntil: '2025-08-31',
    image: '/placeholder.svg?height=300&width=500',
  },
  {
    id: 'offer-6',
    title: 'Welcome Amenity Package',
    description: 'Premium welcome amenities including wine and chocolates',
    pointsRequired: 5000,
    validUntil: '2025-09-30',
    image: '/placeholder.svg?height=300&width=500',
  },
];

// 현재 사용 가능한 오퍼
export const availableOffers = mockSpecialOffers.filter(
  (offer) => new Date(offer.validUntil) > new Date()
);

// 포인트로 교환 가능한 오퍼
export const pointRedemptionOffers = mockSpecialOffers.filter((offer) => offer.pointsRequired > 0);

// 무료 오퍼
export const freeOffers = mockSpecialOffers.filter((offer) => offer.pointsRequired === 0);
