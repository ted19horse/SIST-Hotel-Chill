'use client';

import { Button } from '@/components/common/ui/Button';
import { highlightMatches } from '@/lib/utils/textUtils';
import { Event } from '@/types/dining/event';
import { motion } from 'framer-motion';
import { CalendarDays, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  searchTerm: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function EventCard({ event, searchTerm }: EventCardProps) {
  // API에서 받은 데이터 또는 목업 데이터의 차이에 대비한 안전한 접근
  const eventTitle = event.title || '';
  const eventSubtitle = event.subtitle || '';
  const eventImageUrl = event.imageUrl || '/placeholder.svg?height=480&width=640';
  const eventStartDate = event.startDate || '';
  const eventEndDate = event.endDate || '';
  const eventPrice = typeof event.price === 'number' ? event.price : 0;
  const eventOriginalPrice =
    typeof event.originalPrice === 'number' ? event.originalPrice : undefined;
  const eventDiscountRate = typeof event.discountRate === 'number' ? event.discountRate : 0;
  const eventRestaurantName = event.restaurantName || '';

  // 검색어에 맞는 하이라이트 처리
  const highlightedTitle = highlightMatches(eventTitle, searchTerm);
  const highlightedSubtitle = highlightMatches(eventSubtitle, searchTerm);

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 h-full"
    >
      <div className="relative h-48">
        <Image src={eventImageUrl} alt={eventTitle} fill className="object-cover" />

        {eventDiscountRate > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
            {eventDiscountRate}% 할인
          </div>
        )}
      </div>

      <div className="p-4">
        <h3
          className="text-lg font-bold mb-1"
          dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        />

        <p
          className="text-neutral-600 mb-4 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: highlightedSubtitle }}
        />

        <div className="flex items-center text-sm text-neutral-500 mb-2">
          <CalendarDays className="h-4 w-4 mr-2" />
          {eventStartDate} ~ {eventEndDate}
        </div>

        {eventRestaurantName && (
          <div className="flex items-center text-sm text-neutral-500 mb-4">
            <ShoppingBag className="h-4 w-4 mr-2" />
            {eventRestaurantName}
          </div>
        )}

        <div className="flex justify-between items-center mt-auto pt-2">
          <div className="font-bold text-lg">
            {eventPrice.toLocaleString()}원
            {eventOriginalPrice && (
              <span className="text-sm text-neutral-400 line-through ml-2">
                {eventOriginalPrice.toLocaleString()}원
              </span>
            )}
          </div>

          <Button size="sm">자세히 보기</Button>
        </div>
      </div>
    </motion.div>
  );
}
