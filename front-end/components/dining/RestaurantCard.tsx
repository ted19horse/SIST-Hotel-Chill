'use client';

import { Badge } from '@/components/common/ui/Badge';
import { CardContent } from '@/components/common/ui/Card';
import { formatOpeningHours } from '@/lib/utils/formatters';
import { ChevronRight, Clock, MapPin, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * 레스토랑 정보를 보여주는 카드 컴포넌트
 */
const RestaurantCard = ({ restaurant }) => {
  const {
    id,
    slug,
    name,
    concept,
    cuisine,
    priceRange,
    image,
    thumbnail,
    location,
    openingHours,
    features,
  } = restaurant;

  /**
   * 가격 범위 표시 (₩₩₩₩)를 숫자로 변환
   */
  const getPriceRangeValue = (priceRange) => {
    return priceRange.length;
  };

  /**
   * 영업 시간 포맷팅
   */
  const formattedHours = formatOpeningHours(openingHours);

  // 현재 영업 중인지 확인 (간단한 구현, 실제로는 API에서 가져올 수 있음)
  const isCurrentlyOpen = restaurant.isOpen || false;

  // 이미지 URL (thumbnail이 있으면 사용, 없으면 image 사용, 둘 다 없으면 플레이스홀더 이미지)
  const imageUrl =
    thumbnail || image || 'https://placehold.co/600x400/F1F5F9/667080?text=Chill+Haven+Restaurant';

  return (
    <Link href={`/dining/${slug || id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(restaurant.rating || 0)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-white">
                      {restaurant.rating} ({restaurant.reviewCount})
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-white">{priceRange}</span>
                </div>
              </div>
            </div>
          </div>
          {restaurant.isNew && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              NEW
            </Badge>
          )}
          {restaurant.isPromoted && (
            <Badge variant="default" className="absolute top-3 right-3">
              추천
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                isCurrentlyOpen ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {isCurrentlyOpen ? '영업 중' : '영업 종료'}
            </span>
          </div>
          <div className="mb-3 text-sm text-gray-600">{cuisine}</div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{concept}</p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-start">
              <MapPin className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
              <span>{location}</span>
            </div>
            <div className="flex items-start">
              <Clock className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
              <span>{formattedHours}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {features?.slice(0, 3).map((feature, idx) => (
              <Badge variant="outline" key={idx} className="text-xs">
                {feature}
              </Badge>
            ))}
            {features && features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{features.length - 3}
              </Badge>
            )}
          </div>

          <Link
            href={`/dining/${slug || id}`}
            className="mt-4 flex items-center text-sm font-medium text-primary hover:text-primary/80"
          >
            상세 정보 보기
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </CardContent>
      </div>
    </Link>
  );
};

export default RestaurantCard;